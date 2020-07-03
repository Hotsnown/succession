import unittest
from qualification import Blood_relationship_KE

class testOrdre4(unittest.TestCase):
    def test_uncle(self):
        family = [
            {"member_id":"Pierre","childs":[],"data":{}},
            {"member_id":"Fred","childs":["Pierre"],"data":{}},
            {"member_id":"Bernard","childs":["Fred", "Claude"],"data":{}},
            {"member_id": "Claude", "childs":[], "data": {}}
            ]
        
        target = [
            {"member_id":"Pierre","childs":[],"data":{'degre': 0, 'ordre': 0}},
            {"member_id":"Fred","childs":["Pierre"],"data":{'degre': 1, 'ordre': 2}},
            {"member_id":"Bernard","childs":["Fred", "Claude"],"data":{'degre': 2, 'ordre': 3}},
            {"member_id": "Claude", "childs":[], "data": {'degre': 3, 'ordre': 4}}
            ]

        self.assertEqual(Blood_relationship_KE(family, 'Pierre'), target)

    def test_cousin(self):
        family = [
            {"member_id":"Pierre","childs":[],"data":{}},
            {"member_id":"Fred","childs":["Pierre"],"data":{}},
            {"member_id":"Bernard","childs":["Fred", "Claude"],"data":{}},
            {"member_id": "Claude", "childs":["Cody"], "data": {}},
            {"member_id": "Cody", "childs":[], "data": {}},
            ]
        
        target = [
            {"member_id":"Pierre","childs":[],"data":{'degre': 0, 'ordre': 0}},
            {"member_id":"Fred","childs":["Pierre"],"data":{'degre': 1, 'ordre': 2}},
            {"member_id":"Bernard","childs":["Fred", "Claude"],"data":{'degre': 2, 'ordre': 3}},
            {"member_id": "Claude", "childs":["Cody"], "data": {'degre': 3, 'ordre': 4}},
            {"member_id": "Cody", "childs":[], "data": {'degre': 4, 'ordre': 4}},
            ]

        self.assertEqual(Blood_relationship_KE(family, 'Pierre'), target)

    def test_little_cousin(self):
        family = [
            {"member_id":"Pierre","childs":[],"data":{}},
            {"member_id":"Fred","childs":["Pierre"],"data":{}},
            {"member_id":"Bernard","childs":["Fred", "Claude"],"data":{}},
            {"member_id": "Claude", "childs":["Cody"], "data": {}},
            {"member_id": "Cody", "childs":["Marie"], "data": {}},
            {"member_id": "Marie", "childs":[], "data": {}},
            ]
        
        target = [
            {"member_id":"Pierre","childs":[],"data":{'degre': 0, 'ordre': 0}},
            {"member_id":"Fred","childs":["Pierre"],"data":{'degre': 1, 'ordre': 2}},
            {"member_id":"Bernard","childs":["Fred", "Claude"],"data":{'degre': 2, 'ordre': 3}},
            {"member_id": "Claude", "childs":["Cody"], "data": {'degre': 3, 'ordre': 4}},
            {"member_id": "Cody", "childs":["Marie"], "data": {'degre': 4, 'ordre': 4}},
            {"member_id": "Marie", "childs":[], "data": {'degre': 5, 'ordre': 4}}
            ]

        self.assertEqual(Blood_relationship_KE(family, 'Pierre'), target)

    def test_grand_uncle(self):
        family = [
            {"member_id":"Pierre","childs":[],"data":{}},
            {"member_id":"Fred","childs":["Pierre"],"data":{}},
            {"member_id":"Bernard","childs":["Fred"],"data":{}},
            {"member_id": "Claude", "childs":["Bernard", "Cody"], "data": {}},
            {"member_id": "Cody", "childs":[], "data": {}},
            ]
        
        target = [
            {"member_id":"Pierre","childs":[],"data":{'degre': 0, 'ordre': 0}},
            {"member_id":"Fred","childs":["Pierre"],"data":{'degre': 1, 'ordre': 2}},
            {"member_id":"Bernard","childs":["Fred"],"data":{'degre': 2, 'ordre': 3}},
            {"member_id": "Claude", "childs":["Bernard", "Cody"], "data": {'degre': 3, 'ordre': 3}},
            {"member_id": "Cody", "childs":[], "data": {'degre': 5, 'ordre': 4}},
            ]

        self.assertEqual(Blood_relationship_KE(family, 'Pierre'), target)

    #TODO Cousin issu de germain
    #TODO Petit cousin

    