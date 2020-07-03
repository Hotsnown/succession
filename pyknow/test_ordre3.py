import unittest
from qualification import Blood_relationship_KE

class testOrdre3(unittest.TestCase):
    def test_grand_parent(self):
        family = [
            {"member_id":"Pierre","childs":[],"data":{}},
            {"member_id":"Fred","childs":["Pierre"],"data":{}},
            {"member_id":"Bernard","childs":["Fred"],"data":{}},
            ]
        
        target = [
            {"member_id":"Pierre","childs":[],"data":{'degre': 0, 'ordre': 0}},
            {"member_id":"Fred","childs":["Pierre"],"data":{'degre': 1, 'ordre': 2}},
            {"member_id":"Bernard","childs":["Fred"],"data":{'degre': 2, 'ordre': 3}},
            ]

        self.assertEqual(Blood_relationship_KE(family, 'Pierre'), target)

    def test_grand_grand_parent(self):
        family = [
            {"member_id":"Pierre","childs":[],"data":{}},
            {"member_id":"Fred","childs":["Pierre"],"data":{}},
            {"member_id":"Bernard","childs":["Fred"],"data":{}},
            {"member_id":"Leo","childs":["Bernard"],"data":{}},
            ]
        
        target = [
            {"member_id":"Pierre","childs":[],"data":{'degre': 0, 'ordre': 0}},
            {"member_id":"Fred","childs":["Pierre"],"data":{'degre': 1, 'ordre': 2}},
            {"member_id":"Bernard","childs":["Fred"],"data":{'degre': 2, 'ordre': 3}},
            {"member_id":"Leo","childs":["Bernard"],"data":{'degre': 3, 'ordre': 3}},
            ]

        self.assertEqual(Blood_relationship_KE(family, 'Pierre'), target)

    def test_grand_grand_grand_parent(self):
        family = [
            {"member_id":"Pierre","childs":[],"data":{}},
            {"member_id":"Fred","childs":["Pierre"],"data":{}},
            {"member_id":"Bernard","childs":["Fred"],"data":{}},
            {"member_id":"Leo","childs":["Bernard"],"data":{}},
            {"member_id":"Alphonse","childs":["Leo"],"data":{}},
            ]
        
        target = [
            {"member_id":"Pierre","childs":[],"data":{'degre': 0, 'ordre': 0}},
            {"member_id":"Fred","childs":["Pierre"],"data":{'degre': 1, 'ordre': 2}},
            {"member_id":"Bernard","childs":["Fred"],"data":{'degre': 2, 'ordre': 3}},
            {"member_id":"Leo","childs":["Bernard"],"data":{'degre': 3, 'ordre': 3}},
            {"member_id":"Alphonse","childs":["Leo"],"data":{'degre': 4, 'ordre': 3}},
            ]

        self.assertEqual(Blood_relationship_KE(family, 'Pierre'), target)

    def test_grand_grand_grand_grand_parent(self):
        family = [
            {"member_id":"Pierre","childs":[],"data":{}},
            {"member_id":"Fred","childs":["Pierre"],"data":{}},
            {"member_id":"Bernard","childs":["Fred"],"data":{}},
            {"member_id":"Leo","childs":["Bernard"],"data":{}},
            {"member_id":"Alphonse","childs":["Leo"],"data":{}},
            {"member_id":"Cody","childs":["Alphonse"],"data":{}},
            ]
        
        target = [
            {"member_id":"Pierre","childs":[],"data":{'degre': 0, 'ordre': 0}},
            {"member_id":"Fred","childs":["Pierre"],"data":{'degre': 1, 'ordre': 2}},
            {"member_id":"Bernard","childs":["Fred"],"data":{'degre': 2, 'ordre': 3}},
            {"member_id":"Leo","childs":["Bernard"],"data":{'degre': 3, 'ordre': 3}},
            {"member_id":"Alphonse","childs":["Leo"],"data":{'degre': 4, 'ordre': 3}},
            {"member_id":"Cody","childs":["Alphonse"],"data":{'degre': 5, 'ordre': 3}},
            ]

        self.assertEqual(Blood_relationship_KE(family, 'Pierre'), target)

    def test_grand_grand_grand_grand_grand_parent(self):
        family = [
            {"member_id":"Pierre","childs":[],"data":{}},
            {"member_id":"Fred","childs":["Pierre"],"data":{}},
            {"member_id":"Bernard","childs":["Fred"],"data":{}},
            {"member_id":"Leo","childs":["Bernard"],"data":{}},
            {"member_id":"Alphonse","childs":["Leo"],"data":{}},
            {"member_id":"Cody","childs":["Alphonse"],"data":{}},
            {"member_id":"Etienne","childs":["Cody"],"data":{}},
            ]
        
        target = [
            {"member_id":"Pierre","childs":[],"data":{'degre': 0, 'ordre': 0}},
            {"member_id":"Fred","childs":["Pierre"],"data":{'degre': 1, 'ordre': 2}},
            {"member_id":"Bernard","childs":["Fred"],"data":{'degre': 2, 'ordre': 3}},
            {"member_id":"Leo","childs":["Bernard"],"data":{'degre': 3, 'ordre': 3}},
            {"member_id":"Alphonse","childs":["Leo"],"data":{'degre': 4, 'ordre': 3}},
            {"member_id":"Cody","childs":["Alphonse"],"data":{'degre': 5, 'ordre': 3}},
            {"member_id":"Etienne","childs":["Cody"],"data":{'degre': 6, 'ordre': 3}},
            ]

        self.assertEqual(Blood_relationship_KE(family, 'Pierre'), target)