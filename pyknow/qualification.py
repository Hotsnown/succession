from experta import *
from string import Template
from entities import *
from mocks import family_members
"""
Input = [ {
    "member_id": 0
    "childs" : ["member_id"]
    "attributes" : {
        status: 'valid' | 'invalid'
    }
    } ]
Ouput = [
    {
    "member_id" : 0,
    "childs" : ["member_id"],
    "attributes" : {
        status: 'valid' | 'invalid'
        "ordre" : 0 , 
        "degre" : 0
        }
    }
]
"""


def find_by_member_id(querried_member_id, family_members):
    return list(filter(lambda x: x["member_id"] == querried_member_id, family_members))

def append_degre(data_to_append, querried_member_id, family_members):
    for member in family_members:
        if member["member_id"] == querried_member_id:
            member['attributes']['degre'] = data_to_append
    return family_members

def append_de_cujus(de_cujus, family_members):
    for member in family_members:
        if member["member_id"] == de_cujus:
            member['attributes']['degre'] = 0
            member['attributes']['ordre'] = 0

def append_ordre(data_to_append, querried_member_id, family_members):
    for member in family_members:
        if member["member_id"] == querried_member_id:
            member['attributes']['ordre'] = data_to_append
    return family_members

def Blood_relationship_KE(family_members, de_cujus):

    class KE(KnowledgeEngine):

        @DefFacts()
        def family_members(self):
            for member in family_members:
                yield Identity(person=member["member_id"])

            for member in family_members:
                if len(member["childs"]) != 0:
                    for child in member["childs"]:
                        yield Parent(parent=member["member_id"], child=child)

        @Rule(
            Identity(person=MATCH.x),
            Identity(person=MATCH.y),
            TEST(lambda x, y: x != y)
        )
        def not_same_identity(self, x, y):
            self.declare(NotIdentity(first=x, second=y))

        # Ordre 1
        @Rule(
            Parent(parent=MATCH.x, child=MATCH.y)
        )
        def is_child(self, x, y):
            self.declare(Child(child=y, parent=x))

        @Rule(
            AND(
                Parent(parent=MATCH.y, child=MATCH.z),
                Parent(parent=MATCH.z, child=MATCH.x)
            )
        )
        def is_grandchild(self, x, y):
            self.declare(GrandChild(grandparent=y, grandchild=x))

        @Rule(
            AND(
                Parent(parent=MATCH.x, child=MATCH.z),
                GrandChild(grandparent=MATCH.z, grandchild=MATCH.y)
            )
        )
        def is_grand_grand_child(self, x, y):
            self.declare(Grand_Grand_Child(grand_grand_child=y, grand_grand_parent=x))

        @Rule(
            AND(
                Parent(parent=MATCH.x, child=MATCH.z),
                Grand_Grand_Child(grand_grand_child=MATCH.y, grand_grand_parent=MATCH.z)
            )
        )
        def is_grand_grand_grand_child(self, x, y):
            self.declare(Grand_Grand_Grand_Child(grand_grand_grand_child=y, grand_grand_grand_parent=x))

        @Rule(
            AND(
                Parent(parent=MATCH.x, child=MATCH.z),
                Grand_Grand_Grand_Child(grand_grand_grand_child=MATCH.y, grand_grand_grand_parent=MATCH.z)
            )
        )
        def is_grand_grand_grand_grand_child(self, x, y):
            self.declare(Grand_Grand_Grand_Grand_Child(grand_grand_grand_grand_child=y, grand_grand_grand_grand_parent=x))

        @Rule(
            AND(
                Parent(parent=MATCH.x, child=MATCH.z),
                Grand_Grand_Grand_Grand_Child(grand_grand_grand_grand_child=MATCH.y, grand_grand_grand_grand_parent=MATCH.z)
            )
        )
        def is_grand_grand_grand_grand_grand_child(self, x, y):
            self.declare(Grand_Grand_Grand_Grand_Grand_Child(grand_grand_grand_grand_grand_child=y, grand_grand_grand_grand_grand_parent=x))

        # Ordre 2
        @Rule(
            AND(
                AND(
                    Parent(parent=MATCH.z, child=MATCH.x),
                    Parent(parent=MATCH.z, child=MATCH.y)
                ),
                NotIdentity(first=MATCH.x, second=MATCH.y)
            )
        )
        def is_sibling(self, x, y):
            self.declare(Sibling(first=x, second=y))

        @Rule(
            AND(
                Sibling(first=MATCH.x, second=MATCH.z),
                Child(child=MATCH.y, parent=MATCH.z)
            )
        )
        def is_niece(self, x, y):
            self.declare(Niece(niece=y, uncle=x))

        @Rule(
            AND(
                Niece(niece=MATCH.z, uncle=MATCH.y),
                Child(child=MATCH.x, parent=MATCH.z)
            )
        )
        def is_grand_nephew(self, x, y):
            self.declare(Grand_nephew(grand_nephew=x, grand_uncle=y))

        @Rule(
            AND(
                Grand_nephew(grand_nephew=MATCH.z, grand_uncle=MATCH.y),
                Child(child=MATCH.x, parent=MATCH.z)
            )
        )
        def is_grand_grand_nephew(self, x, y):
            self.declare(Grand_Grand_nephew(grand_grand_nephew=x, grand_grand_uncle=y))

        @Rule(
            AND(
                Grand_Grand_nephew(grand_grand_nephew=MATCH.z, grand_grand_uncle=MATCH.y),
                Child(child=MATCH.x, parent=MATCH.z)
            )
        )
        def is_grand_grand_grand_nephew(self, x, y):
            self.declare(Grand_Grand_Grand_nephew(grand_grand_grand_nephew=x, grand_grand_grand_uncle=y))

        # Ordre 3
        @Rule(
            AND(
                Parent(parent=MATCH.x, child=MATCH.z),
                Parent(parent=MATCH.z, child=MATCH.y)
            )
        )
        def is_grandparent(self, x, y):
            self.declare(GrandParent(grandparent=x, grandchild=y))

        @Rule(
            AND(
                Parent(parent=MATCH.x, child=MATCH.z),
                GrandParent(grandparent=MATCH.z, grandchild=MATCH.y)
            )
        )
        def is_grand_grand_parent(self, x, y):
            self.declare(Grand_Grand_Parent(
                grand_grand_parent=x, grand_grand_child=y))

        @Rule(
            AND(
                Parent(parent=MATCH.x, child=MATCH.z),
                Grand_Grand_Parent(grand_grand_parent=MATCH.z, grand_grand_child=MATCH.y)
            )
        )
        def is_grand_grand_grand_parent(self, x, y):
            self.declare(Grand_Grand_Grand_Parent(
                grand_grand_grand_parent=x, grand_grand_grand_child=y))

        @Rule(
            AND(
                Parent(parent=MATCH.x, child=MATCH.z),
                Grand_Grand_Grand_Parent(grand_grand_grand_parent=MATCH.z, grand_grand_grand_child=MATCH.y)
            )
        )
        def is_grand_grand_grand_grand_parent(self, x, y):
            self.declare(Grand_Grand_Grand_Grand_Parent(
                grand_grand_grand_grand_parent=x, grand_grand_grand_grand_child=y))
        
        @Rule(
            AND(
                Parent(parent=MATCH.x, child=MATCH.z),
                Grand_Grand_Grand_Grand_Parent(grand_grand_grand_grand_parent=MATCH.z, grand_grand_grand_grand_child=MATCH.y)
            )
        )
        def is_grand_grand_grand_grand_grand_parent(self, x, y):
            self.declare(Grand_Grand_Grand_Grand_Grand_Parent(
                grand_grand_grand_grand_grand_parent=x, grand_grand_grand_grand_grand_child=y))
        
        # Ordre 4
        @Rule(
            AND(
                Sibling(first=MATCH.x, second=MATCH.z),
                Child(child=MATCH.y, parent=MATCH.z)
            )
        )
        def is_uncle(self, x, y):
            self.declare(Uncle(uncle=x, nephew=y))

        @Rule(
            AND(
                Sibling(first=MATCH.x, second=MATCH.z),
                GrandParent(grandparent=MATCH.z, grandchild=MATCH.y)
            )
        )
        def is_grand_uncle(self, x, y):
            self.declare(Grand_Uncle(grand_uncle=x, grand_nephew=y))

        @Rule(
            AND(
                Uncle(uncle=MATCH.z, nephew=MATCH.x),
                Parent(parent=MATCH.z, child=MATCH.y)
            )
        )
        def is_cousin(self, x, y):
            self.declare(Cousin(first=x, second=y))

        @Rule(
            AND(
                Cousin(first=MATCH.z, second=MATCH.x),
                Parent(parent=MATCH.z, child=MATCH.y)
            )
        )
        def is_little_cousin(self, x, y):
            self.declare(Little_Cousin(little_cousin_first=x, little_cousin_second=y))

        #Ordres
        @Rule(
            OR(
                Child(child=MATCH.x, parent=de_cujus),
                GrandChild(grandchild=MATCH.x, grandparent=de_cujus),
                Grand_Grand_Child(grand_grand_child=MATCH.x, grand_grand_parent=de_cujus),
                Grand_Grand_Grand_Child(grand_grand_grand_child= MATCH.x, grand_grand_grand_parent= de_cujus),
                Grand_Grand_Grand_Grand_Child(grand_grand_grand_grand_child= MATCH.x, grand_grand_grand_grand_parent= de_cujus),
                Grand_Grand_Grand_Grand_Grand_Child(grand_grand_grand_grand_grand_child= MATCH.x, grand_grand_grand_grand_grand_parent= de_cujus),
            )
        )
        def ordre1(self, x):
            append_ordre(1, x, family_members)

        @Rule(
            OR(
                Parent(parent=MATCH.x, child=de_cujus),
                Sibling(first=MATCH.x, second=de_cujus),
                Niece(niece=MATCH.x, uncle=de_cujus),
                Grand_nephew(grand_nephew=MATCH.x, grand_uncle=de_cujus),
                Grand_Grand_nephew(grand_grand_nephew=MATCH.x, grand_grand_uncle=de_cujus),
                Grand_Grand_Grand_nephew(grand_grand_grand_nephew=MATCH.x, grand_grand_grand_uncle=de_cujus)
            )
        )
        def ordre2(self, x):
            append_ordre(2, x, family_members)

        @Rule(
            OR(
                GrandParent(grandparent=MATCH.x, grandchild=de_cujus),
                Grand_Grand_Parent(grand_grand_parent=MATCH.x,
                                grand_grand_child=de_cujus),
                Grand_Grand_Grand_Parent(grand_grand_grand_parent=MATCH.x, grand_grand_grand_child=de_cujus),
                Grand_Grand_Grand_Grand_Parent(
                grand_grand_grand_grand_parent=MATCH.x, grand_grand_grand_grand_child=de_cujus),
                Grand_Grand_Grand_Grand_Grand_Parent(
                grand_grand_grand_grand_grand_parent=MATCH.x, grand_grand_grand_grand_grand_child=de_cujus)
            )
        )
        def ordre3(self, x):
            append_ordre(3, x, family_members)

        @Rule(
            OR(
                Uncle(uncle=MATCH.x, nephew=de_cujus),
                Cousin(first=MATCH.x, second=de_cujus),
                Grand_Uncle(grand_uncle=MATCH.x, grand_nephew=de_cujus),
                Little_Cousin(little_cousin_first=MATCH.x, little_cousin_second=de_cujus)
            )
        )
        def ordre4(self, x):
            append_ordre(4, x, family_members)

        #Degres
        @Rule(
            OR(
                Child(child=MATCH.x, parent=de_cujus),
                Parent(parent=MATCH.x, child=de_cujus)
            )
        )
        def degre1(self, x):
            append_degre(1, x, family_members)

        @Rule(
            OR(
                GrandChild(grandchild=MATCH.x, grandparent=de_cujus),
                Sibling(first=MATCH.x, second=de_cujus),
                GrandParent(grandparent=MATCH.x, grandchild=de_cujus),
            )
        )
        def degre2(self, x):
            append_degre(2, x, family_members)


        @Rule(
            OR(
                Grand_Grand_Child(grand_grand_child=MATCH.x,
                                grand_grand_parent=de_cujus),
                Niece(niece=MATCH.x, uncle=de_cujus),
                Grand_Grand_Parent(grand_grand_parent=MATCH.x,
                                grand_grand_child=de_cujus),
                Uncle(uncle=MATCH.x, nephew=de_cujus)
            )
        )
        def degre3(self, x):
            append_degre(3, x, family_members)


        @Rule(
            OR(
                Grand_nephew(grand_nephew=MATCH.x, grand_uncle=de_cujus),
                Grand_Grand_Grand_Child(grand_grand_grand_child= MATCH.x, grand_grand_grand_parent= de_cujus),
                Grand_Grand_Grand_Parent(grand_grand_grand_parent=MATCH.x, grand_grand_grand_child=de_cujus),
                Cousin(first=MATCH.x, second=de_cujus),
            )
        )
        def degre4(self, x):
            append_degre(4, x, family_members)

        @Rule(
            OR(
                Grand_Grand_Grand_Grand_Child(grand_grand_grand_grand_child= MATCH.x, grand_grand_grand_grand_parent= de_cujus),
                Grand_Grand_nephew(grand_grand_nephew=MATCH.x, grand_grand_uncle=de_cujus),
                Grand_Grand_Grand_Grand_Parent(
                grand_grand_grand_grand_parent=MATCH.x, grand_grand_grand_grand_child=de_cujus),
                Grand_Uncle(grand_uncle=MATCH.x, grand_nephew=de_cujus),
                Little_Cousin(little_cousin_first=MATCH.x, little_cousin_second=de_cujus)
            )
        )
        def degre5(self, x):
            append_degre(5, x, family_members)

        @Rule(
            OR(
                Grand_Grand_Grand_Grand_Grand_Child(grand_grand_grand_grand_grand_child= MATCH.x, grand_grand_grand_grand_grand_parent= de_cujus),
                Grand_Grand_Grand_nephew(grand_grand_grand_nephew=MATCH.x, grand_grand_grand_uncle=de_cujus),
                Grand_Grand_Grand_Grand_Grand_Parent(
                grand_grand_grand_grand_grand_parent=MATCH.x, grand_grand_grand_grand_grand_child=de_cujus)
            )
        )
        def degre6(self, x):
            append_degre(6, x, family_members)

    ke = KE()
    ke.reset()
    ke.agenda
    ke.facts
    ke.run()

    append_de_cujus(de_cujus, family_members)
    return family_members