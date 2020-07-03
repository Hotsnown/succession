from experta import *

class NotIdentity(Fact):
    first = Field(str)
    second = Field(str)

class Identity(Fact):
    person= Field(str)

class Parent(Fact):
    parent = Field(str)
    child = Field(str)

class Child(Fact):
    child = Field(str)
    parent = Field(str)

class GrandChild(Fact):
    grandparent = Field(str)
    grandchild = Field(str)

class Grand_Grand_Child(Fact):
    grand_grand_child = Field(str)
    grand_grand_parent = Field(str)

class Grand_Grand_Grand_Child(Fact):
    grand_grand_grand_child = Field(str)
    grand_grand_grand_parent = Field(str)

class Grand_Grand_Grand_Grand_Child(Fact):
    grand_grand_grand_grand_child = Field(str)
    grand_grand_grand_grand_parent = Field(str)  

class Grand_Grand_Grand_Grand_Grand_Child(Fact):
    grand_grand_grand_grand_grand_child = Field(str)
    grand_grand_grand_grand_grand_parent = Field(str)  

class Sibling(Fact):
    first = Field(str)
    second = Field(str)

class Niece(Fact):
    niece = Field(str)
    uncle = Field(str)

class Grand_nephew(Fact):
    grand_niece = Field(str)
    grand_uncle = Field(str)

class Grand_Grand_nephew(Fact):
    grand_grand_niece = Field(str)
    grand_grand_uncle = Field(str)

class Grand_Grand_Grand_nephew(Fact):
    grand_grand_grand_niece = Field(str)
    grand_grand_grand_uncle = Field(str)

class GrandParent(Fact):
    grandparent = Field(str)
    grandchild  = Field(str)

class Grand_Grand_Parent(Fact):
    grand_grand_parent = Field(str)
    grand_grand_child = Field(str)

class Grand_Grand_Grand_Parent(Fact):
    grand_grand_grand_parent = Field(str)
    grand_grand_grand_child = Field(str)

class Grand_Grand_Grand_Grand_Parent(Fact):
    grand_grand_grand_grand_parent = Field(str)
    grand_grand_grand_grand_child = Field(str)

class Grand_Grand_Grand_Grand_Grand_Parent(Fact):
    grand_grand_grand_grand_grand_parent = Field(str)
    grand_grand_grand_grand_grand_child = Field(str)

class Uncle(Fact):
    uncle = Field(str)
    nephew = Field(str)

class Grand_Uncle(Fact):
    grand_uncle = Field(str)
    grand_nephew = Field(str)

class Little_Cousin(Fact):
    little_cousin_first = Field(str)
    little_cousin_second = Field(str)

class Cousin(Fact):
    first = Field(str)
    second = Field(str)
