import unittest
from qualification import Blood_relationship_KE

class testOrdre2(unittest.TestCase):
    def test_parent(self):
        family = [
            {"member_id":"Pierre","childs":[],"data":{}},
            {"member_id":"Fred","childs":["Pierre"],"data":{}}
            ]
        
        target = [
            {"member_id":"Pierre","childs":[],"data":{'degre': 0, 'ordre': 0}},
            {"member_id":"Fred","childs":["Pierre"],"data":{'degre': 1, 'ordre': 2}}
            ]

        self.assertEqual(Blood_relationship_KE(family, 'Pierre'), target)

    def test_sibling(self):
        family = [
            {"member_id":"Pierre","childs":[],"data":{}},
            {"member_id":"Marie","childs":[],"data":{}},
            {"member_id":"Fred","childs":["Pierre","Marie"],"data":{}}
            ]
        
        target = [
            {"member_id":"Pierre","childs":[],"data":{'degre': 0, 'ordre': 0}},
            {"member_id":"Marie","childs":[],"data":{'degre': 2, 'ordre': 2}},
            {"member_id":"Fred","childs":["Pierre","Marie"],"data":{'degre': 1, 'ordre': 2}}
            ]

        self.assertEqual(Blood_relationship_KE(family, 'Pierre'), target)
  
    def test_nephew(self):
        family = [
            {"member_id":"Pierre","childs":[],"data":{}},
            {"member_id":"Fred","childs":["Pierre","Marie"],"data":{}},
            {"member_id":"Marie","childs":["Gerard"],"data":{}},
            {"member_id":"Gerard","childs":[],"data":{}},
            ]
        
        target = [
            {"member_id":"Pierre","childs":[],"data":{'degre': 0, 'ordre': 0}},
            {"member_id":"Fred","childs":["Pierre","Marie"],"data":{'degre': 1, 'ordre': 2}},
            {"member_id":"Marie","childs":["Gerard"],"data":{'degre': 2, 'ordre': 2}},
            {"member_id":"Gerard","childs":[],"data":{'degre': 3, 'ordre': 2}},
            ]

        self.assertEqual(Blood_relationship_KE(family, 'Pierre'), target)

    def test_grand_nephew(self):
        family = [
            {"member_id":"Pierre","childs":[],"data":{}},
            {"member_id":"Fred","childs":["Pierre","Marie"],"data":{}},
            {"member_id":"Marie","childs":["Gerard"],"data":{}},
            {"member_id":"Gerard","childs":["Romeo"],"data":{}},
            {"member_id":"Romeo","childs":[],"data":{}},
            ]
        
        target = [
            {"member_id":"Pierre","childs":[],"data":{'degre': 0, 'ordre': 0}},
            {"member_id":"Fred","childs":["Pierre","Marie"],"data":{'degre': 1, 'ordre': 2}},
            {"member_id":"Marie","childs":["Gerard"],"data":{'degre': 2, 'ordre': 2}},
            {"member_id":"Gerard","childs":["Romeo"],"data":{'degre': 3, 'ordre': 2}},
            {"member_id":"Romeo","childs":[],"data":{'degre': 4, 'ordre': 2}}
            ]

        self.assertEqual(Blood_relationship_KE(family, 'Pierre'), target)

    def test_grand_grand_nephew(self):
        family = [
            {"member_id":"Pierre","childs":[],"data":{}},
            {"member_id":"Fred","childs":["Pierre","Marie"],"data":{}},
            {"member_id":"Marie","childs":["Gerard"],"data":{}},
            {"member_id":"Gerard","childs":["Romeo"],"data":{}},
            {"member_id":"Romeo","childs":["Leo"],"data":{}},
            {"member_id":"Leo","childs":[],"data":{}},
            ]
        
        target = [
            {"member_id":"Pierre","childs":[],"data":{'degre': 0, 'ordre': 0}},
            {"member_id":"Fred","childs":["Pierre","Marie"],"data":{'degre': 1, 'ordre': 2}},
            {"member_id":"Marie","childs":["Gerard"],"data":{'degre': 2, 'ordre': 2}},
            {"member_id":"Gerard","childs":["Romeo"],"data":{'degre': 3, 'ordre': 2}},
            {"member_id":"Romeo","childs":["Leo"],"data":{'degre': 4, 'ordre': 2}},
            {"member_id":"Leo","childs":[],"data":{'degre': 5, 'ordre': 2}},
            ]

        self.assertEqual(Blood_relationship_KE(family, 'Pierre'), target)

    def test_grand__grand_grand_nephew(self):
        family = [
            {"member_id":"Pierre","childs":[],"data":{}},
            {"member_id":"Fred","childs":["Pierre","Marie"],"data":{}},
            {"member_id":"Marie","childs":["Gerard"],"data":{}},
            {"member_id":"Gerard","childs":["Romeo"],"data":{}},
            {"member_id":"Romeo","childs":["Leo"],"data":{}},
            {"member_id":"Leo","childs":["Guillaume"],"data":{}},
            {"member_id":"Guillaume","childs":[],"data":{}}
            ]
        
        target = [
            {"member_id":"Pierre","childs":[],"data":{'degre': 0, 'ordre': 0}},
            {"member_id":"Fred","childs":["Pierre","Marie"],"data":{'degre': 1, 'ordre': 2}},
            {"member_id":"Marie","childs":["Gerard"],"data":{'degre': 2, 'ordre': 2}},
            {"member_id":"Gerard","childs":["Romeo"],"data":{'degre': 3, 'ordre': 2}},
            {"member_id":"Romeo","childs":["Leo"],"data":{'degre': 4, 'ordre': 2}},
            {"member_id":"Leo","childs":["Guillaume"],"data":{'degre': 5, 'ordre': 2}},
            {"member_id":"Guillaume","childs":[],"data":{'degre': 6, 'ordre': 2}}
            ]

        self.assertEqual(Blood_relationship_KE(family, 'Pierre'), target)
