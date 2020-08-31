import { Refine, Family, Member, Ordre as O } from '../../entities'
import * as R from 'ramda'

/**
 * Each node must be annotated with the ordre attribute, witch can take any of this values: 1 | 2 | 3 | 4 | 'outsider'.
 * - **Ordre1** : Given a deCujus, a node x belongs to ordre 1 if x is a descendant of the deCujus.
 * - **Ordre 2** : Given a deCujus, a node x belongs to ordre 2 if the mother/father of the deCujus is an ascendant of x.
 * - **Ordre 3** : Given a deCujus, a node x belongs to ordre 3 if x is an ascendant of the deCujus. 
 * - **Ordre 4** : Given a deCujus, a node x belongs to ordre 4 if an ascendant of the de cujus (except to the father/mother) is an ascendant of x.
 * 
 * A *descendant* is the child of the de cujus or the the descendant of the child of the de cujus.
 * 
 * An *ascendant* is the parent of the de cujus or the ascendant of the parent of the de cujus.
 */
export const assignOrdres: Refine = (family) => {
  family.deCujus.attributes.ordre = 0

  return Family.create(
    family.members.map(member => member.member_id !== family.deCujus.member_id ? assignOrdreOf(member, family) : member), 
    family.deCujus.member_id)
}

function assignOrdreOf(nodeToQualify: Member, family: Family): Member {

  return R.cond([
    [isDescendant, assignOrdre1],
    [isPriviledgedCollateral, assignOrdre2],
    [isAscendant, assignOrdre3],
    [isCollateral, assignOrdre4],
    [R.T, assignOutsideDevolution]
  ])(nodeToQualify, family)
}

type qualifyOrdre = R.CurriedFunction2<Member, Family, boolean>

const isDescendant: qualifyOrdre = R.curry((nodeToQualify: Member, family: Family): boolean => {
  const parents = family.findParentsOf(nodeToQualify.member_id).filter(parent => parent !== undefined)
  if (parents.map(parent => parent.member_id).includes(family.deCujus.member_id)) return true
  if (parents[0]) return isDescendant(parents[0], family)
  if (parent[1]) return isDescendant(parents[1], family)
  return false
})

const isPriviledgedCollateral: qualifyOrdre = R.curry((nodeToQualify: Member, family: Family): boolean => {
  const nodeToQualifyAncestors = family.ancestorsOf(nodeToQualify)
  const parents = family.findParentsOf(family.deCujus.member_id).filter(member => member !== undefined)
  if (R.intersection(nodeToQualifyAncestors, parents).length !== 0) return true
  return false
})

const isAscendant: qualifyOrdre = R.curry((nodeToQualify: Member, family: Family): boolean => {
  return family.ancestorsOf(family.deCujus).map(member => member.member_id).includes(nodeToQualify.member_id)
})

const isCollateral: qualifyOrdre = R.curry((nodeToQualify: Member, family: Family): boolean => {
  const deCujusAncestors = family.ancestorsOf(family.deCujus)
  const nodeToQualifyAncestors = family.ancestorsOf(nodeToQualify)
  if (R.intersection(deCujusAncestors, nodeToQualifyAncestors).length !== 0) return true
  return false
})

function assignOrdre1(nodeToQualify: Member) {
  return nodeToQualify.copyWith({ ordre: O.Ordre1 })
}

function assignOrdre2(nodeToQualify: Member) {
  return nodeToQualify.copyWith({ ordre: O.Ordre2 })
}

function assignOrdre3(nodeToQualify: Member) {
  return nodeToQualify.copyWith({ ordre: O.Ordre3 })
}

function assignOrdre4(nodeToQualify: Member) {
  return nodeToQualify.copyWith({ ordre: O.Ordre4 })
}

function assignOutsideDevolution(nodeToQualify: Member) {
  return nodeToQualify.copyWith({ ordre: 'outsider' })
}