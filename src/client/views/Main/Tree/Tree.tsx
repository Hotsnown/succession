/*eslint-disable*/
import React from 'react';
import TreeMember from './TreeMember/TreeMember';
import TreeParser from './TreeParser';

interface TreeProps {
  root: any
  datalist: any
}

interface TreeState {
  memberlist: any
  rootid: string
  membercount: number
  position?: any
}

class Tree extends React.Component <TreeProps, TreeState> {

  memberlist: any[]
  nextMemberId: number

  constructor(props: TreeProps) {
    super(props);

    // normalize all possible tree representations into single nested data object
    var parser = new TreeParser(props.datalist, props.root);
    this.memberlist = parser.getMemberlist();
    this.nextMemberId = parser.getNextMemberId();
    this.state = {
      memberlist: this.memberlist,
      rootid: this.props.root,
      membercount: this.memberlist.length//parseInt(this.memberlist.length)
    }

    this.handleAddPartner = this.handleAddPartner.bind(this);
    this.handleAddChild = this.handleAddChild.bind(this);
    this.handleMemberEdit = this.handleMemberEdit.bind(this);
    this.handleMemberDelete = this.handleMemberDelete.bind(this);
    this.handleUpdateStatus = this.handleUpdateStatus.bind(this);
  }

  // SIMPLE GETTERS //

  getNextMemberId(memberlist: undefined | any[]) {
    if (memberlist === undefined) memberlist = this.state.memberlist;
    //@ts-ignore
    let ids = Object.keys(memberlist);
    let append = 1;
    let prepend = 'new_member_';
    while (ids.indexOf(prepend + append) >= 0) append++;
    return prepend + append;
  }

  getNewMember(name: string, id: string) {
    return { 'id': id, 'name': name, 'partners': [], 'children': [] }
  }

  // HANDLERS //

  handleMemberEdit(member_id: string, data: any) {
    this.setState(function (prev_state, props) {
      var memberlist = { ...prev_state.memberlist };
      memberlist[member_id].name = data.name;
      return { 'memberlist': memberlist };
    });
  }

  handleUpdateStatus(member_id: string) {
    this.setState(function (prev_state, props) {
      let memberlist = { ...prev_state.memberlist };
      memberlist[member_id].status = !memberlist[member_id].status;
      return { 'memberlist': memberlist };
    });
  }

  handleMemberDelete(member_id: string) {
    this.setState(function (prev_state, props) {
      var memberlist = { ...prev_state.memberlist };
      var member = memberlist[member_id];
      if (member.partners != null && member.partners.length > 0) alert('On ne peut pas supprimer un membre ayant un partenaire');
      else alert("Il n\' est pas encore possible de supprimer");
    });
  }

  handleAddPartner(root_id: string) {
    this.setState(function (prev_state, props) {
      let memberlist = { ...prev_state.memberlist };
      //@ts-ignore
      let new_id = this.getNextMemberId(memberlist);
      //@ts-ignore
      let new_member = this.getNewMember('Nouveau partenaire', new_id);
      memberlist[new_member.id] = new_member;
      memberlist[root_id].partners.push(new_member);
      memberlist[root_id].children[new_member.id] = [];
      return { 'memberlist': memberlist };
    });
  }

  handleAddChild(root_id: string, partner_id: string) {
    this.setState(function (prev_state, props) {
      let memberlist = { ...prev_state.memberlist };
      //@ts-ignore
      let new_id = this.getNextMemberId(memberlist);
      //@ts-ignore
      let new_member = this.getNewMember('Nouvel enfant', new_id);
      memberlist[new_member.id] = new_member;
      if (!Array.isArray(memberlist[root_id].children[partner_id])) {
        memberlist[root_id].children[partner_id] = [];
      }
      memberlist[root_id].children[partner_id].push(new_member);
      return { 'memberlist': memberlist };
    });
  }

  // RENDERERS //

  render() {

    return (
      <div className="overflow-auto">
        <br></br>
        <TreeMember
          {...this.state.memberlist[this.state.rootid]}
          onAddPartner={this.handleAddPartner}
          onAddChild={this.handleAddChild}
          onEdit={this.handleMemberEdit}
          onUpdateStatus={this.handleUpdateStatus}
          onDelete={this.handleMemberDelete}
          parentPosition={this.state.position}
        />
        </div>
      )
  }
}

export default Tree;
