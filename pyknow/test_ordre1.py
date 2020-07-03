import unittest
from qualification import Blood_relationship_KE

class testOrdre1(unittest.TestCase):
    def test_child(self):
        family = [
            {"member_id":"Pierre","childs":[],"data":{}},
            {"member_id":"Marie","childs":[],"data":{}},
            {"member_id":"Fred","childs":["Pierre","Marie"],"data":{}}
            ]
        
        target = [
            {"member_id":"Pierre","childs":[],"data":{'degre': 1, 'ordre': 1}},
            {"member_id":"Marie","childs":[],"data":{'degre': 1, 'ordre': 1}},
            {"member_id":"Fred","childs":["Pierre","Marie"],"data":{'degre': 0, 'ordre': 0}}
            ]

        self.assertEqual(Blood_relationship_KE(family, 'Fred'), target)

    def test_grand_child(self):
        family = [
            {"member_id":"Bernard","childs":["Fred"],"data":{}},
            {"member_id":"Fred","childs":["Pierre"],"data":{}},
            {"member_id":"Pierre","childs":[],"data":{}}
            ]
        
        target = [
            {"member_id":"Bernard","childs":["Fred"],"data":{'degre':0, 'ordre': 0}},
            {"member_id":"Fred","childs":["Pierre"],"data":{'degre': 1, 'ordre': 1}},
            {"member_id":"Pierre","childs":[],"data":{'degre': 2, 'ordre': 1}}
            ]

        self.assertEqual(Blood_relationship_KE(family, 'Bernard'), target)

    def test_grand_grand_child(self):
        family = [
            {"member_id":"Bernard","childs":["Fred"],"data":{}},
            {"member_id":"Fred","childs":["Pierre"],"data":{}},
            {"member_id":"Pierre","childs":["Claude"],"data":{}},
            {"member_id":"Claude","childs":[],"data":{}},
            ]
        
        target = [
            {"member_id":"Bernard","childs":["Fred"],"data":{'degre':0, 'ordre': 0}},
            {"member_id":"Fred","childs":["Pierre"],"data":{'degre': 1, 'ordre': 1}},
            {"member_id":"Pierre","childs":["Claude"],"data":{'degre': 2, 'ordre': 1}},
            {"member_id":"Claude","childs":[],"data":{'degre': 3, 'ordre': 1}}
            ]

        self.assertEqual(Blood_relationship_KE(family, 'Bernard'), target)

    def test_grand_grand_grand_child(self):
        family = [
            {"member_id":"Bernard","childs":["Fred"],"data":{}},
            {"member_id":"Fred","childs":["Pierre"],"data":{}},
            {"member_id":"Pierre","childs":["Claude"],"data":{}},
            {"member_id":"Claude","childs":["Alphonse"],"data":{}},
            {"member_id":"Alphonse","childs":[],"data":{}},
            ]
        
        target = [
            {"member_id":"Bernard","childs":["Fred"],"data":{'degre':0, 'ordre': 0}},
            {"member_id":"Fred","childs":["Pierre"],"data":{'degre': 1, 'ordre': 1}},
            {"member_id":"Pierre","childs":["Claude"],"data":{'degre': 2, 'ordre': 1}},
            {"member_id":"Claude","childs":["Alphonse"],"data":{'degre': 3, 'ordre': 1}},
            {"member_id":"Alphonse","childs":[],"data":{'degre': 4, 'ordre': 1}}
            ]

        self.assertEqual(Blood_relationship_KE(family, 'Bernard'), target)

    def test_grand_grand_grand_grand_child(self):
        family = [
            {"member_id":"Bernard","childs":["Fred"],"data":{}},
            {"member_id":"Fred","childs":["Pierre"],"data":{}},
            {"member_id":"Pierre","childs":["Claude"],"data":{}},
            {"member_id":"Claude","childs":["Alphonse"],"data":{}},
            {"member_id":"Alphonse","childs":["Leo"],"data":{}},
            {"member_id":"Leo","childs":[],"data":{}},
            ]
        
        target = [
            {"member_id":"Bernard","childs":["Fred"],"data":{'degre':0, 'ordre': 0}},
            {"member_id":"Fred","childs":["Pierre"],"data":{'degre': 1, 'ordre': 1}},
            {"member_id":"Pierre","childs":["Claude"],"data":{'degre': 2, 'ordre': 1}},
            {"member_id":"Claude","childs":["Alphonse"],"data":{'degre': 3, 'ordre': 1}},
            {"member_id":"Alphonse","childs":["Leo"],"data":{'degre': 4, 'ordre': 1}},
            {"member_id":"Leo","childs":[],"data":{'degre': 5, 'ordre': 1}},
            ]

        self.assertEqual(Blood_relationship_KE(family, 'Bernard'), target)

    def test_grand_grand_grand_grand_grand_child(self):
        family = [
            {"member_id":"Bernard","childs":["Fred"],"data":{}},
            {"member_id":"Fred","childs":["Pierre"],"data":{}},
            {"member_id":"Pierre","childs":["Claude"],"data":{}},
            {"member_id":"Claude","childs":["Alphonse"],"data":{}},
            {"member_id":"Alphonse","childs":["Leo"],"data":{}},
            {"member_id":"Leo","childs":["Romeo"],"data":{}},
            {"member_id":"Romeo","childs":[],"data":{}},
            ]
        
        target = [
            {"member_id":"Bernard","childs":["Fred"],"data":{'degre':0, 'ordre': 0}},
            {"member_id":"Fred","childs":["Pierre"],"data":{'degre': 1, 'ordre': 1}},
            {"member_id":"Pierre","childs":["Claude"],"data":{'degre': 2, 'ordre': 1}},
            {"member_id":"Claude","childs":["Alphonse"],"data":{'degre': 3, 'ordre': 1}},
            {"member_id":"Alphonse","childs":["Leo"],"data":{'degre': 4, 'ordre': 1}},
            {"member_id":"Leo","childs":["Romeo"],"data":{'degre': 5, 'ordre': 1}},
            {"member_id":"Romeo","childs":[],"data":{'degre': 6, 'ordre': 1}}
            ]

        self.assertEqual(Blood_relationship_KE(family, 'Bernard'), target)

if __name__ == '__main__':
    unittest.main()