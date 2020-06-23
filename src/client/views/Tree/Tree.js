import React from 'react';
import TreeMember from './TreeMember/TreeMember';
import TreeParser from './TreeParser';

class Tree extends React.Component {

  constructor(props) {
    super(props);

    // normalize all possible tree representations into single nested data object
    var parser = new TreeParser(props.datalist, props.root);
    this.memberlist = parser.getMemberlist();
    this.nextMemberId = parser.getNextMemberId();
    this.state = {
      memberlist: this.memberlist,
      rootid: this.props.root,
      membercount: parseInt(this.memberlist.length)
    }

    // bind handlers
    this.handleAddPartner = this.handleAddPartner.bind(this);
    this.handleAddChild = this.handleAddChild.bind(this);
    this.handleMemberEdit = this.handleMemberEdit.bind(this);
    this.handleMemberDelete = this.handleMemberDelete.bind(this);
  }

  // SIMPLE GETTERS //

  getNextMemberId(memberlist) {
    if (memberlist === undefined) memberlist = this.state.memberlist;
    let ids = Object.keys(memberlist);
    let append = 1;
    let prepend = 'new_member_';
    while (ids.indexOf(prepend + append) >= 0) append++;
    return prepend + append;
  }

  getNewMember(name, id) {
    return { 'id': id, 'name': name, 'partners': [], 'children': [] }
  }

  // HANDLERS //

  handleMemberEdit(member_id, data) {
    this.setState(function (prev_state, props) {
      var memberlist = { ...prev_state.memberlist };
      memberlist[member_id].name = data.name;
      return { 'memberlist': memberlist };
    });
  }

  handleMemberDelete(member_id) {
    this.setState(function (prev_state, props) {
      var memberlist = { ...prev_state.memberlist };
      var member = memberlist[member_id];
      if (member.partners != null && member.partners.length > 0) alert('On ne peut pas supprimer un membre ayant un partenaire');
      else alert("Il n\' est pas encore possible de supprimer");
    });
  }

  handleAddPartner(root_id) {
    this.setState(function (prev_state, props) {
      let memberlist = { ...prev_state.memberlist };
      let new_id = this.getNextMemberId(memberlist);
      let new_member = this.getNewMember('Nouveau partenaire', new_id);
      memberlist[new_member.id] = new_member;
      memberlist[root_id].partners.push(new_member);
      memberlist[root_id].children[new_member.id] = [];
      return { 'memberlist': memberlist };
    });
  }

  handleAddChild(root_id, partner_id) {
    this.setState(function (prev_state, props) {
      let memberlist = { ...prev_state.memberlist };
      let new_id = this.getNextMemberId(memberlist);
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

    console.log(this.state.memberlist)

    return (
      <div className="overflow-auto">
        <br></br>
        <TreeMember
          {...this.state.memberlist[this.state.rootid]}
          onAddPartner={this.handleAddPartner}
          onAddChild={this.handleAddChild}
          onEdit={this.handleMemberEdit}
          onDelete={this.handleMemberDelete}
          parentPosition={this.state.position}
        />
        </div>
      )
  }
}

export default Tree;
