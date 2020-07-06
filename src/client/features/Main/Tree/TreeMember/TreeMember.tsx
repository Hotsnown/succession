/*eslint-disable*/
import React from 'react';
import styled from 'styled-components';
import TreeListPartners from '../TreeListPartners/TreeListPartners';
import TreeListChildren from '../TreeListChildren/TreeListChildren';
import TreeNodeMenu from '../TreeNodeMenu/TreeNodeMenu';
//import { TreenodeWidth, TreenodeMargin, LinkProperties, TreeList } from './../TreeStylesShared';
import * as CommonStyles from '../TreeStylesShared';
import * as TreeDimensionCalc from './TreeDimensionCalc';

const TreeHeader = CommonStyles.TreeHeader;
const VisuallyHiddenHeader = CommonStyles.VisuallyHidden.withComponent('h1');

interface TreeTrunkProps {
  width: number
}

const TreeTrunk = styled.article<TreeTrunkProps>`
  display: inline-block;
  vertical-align: top;
  text-align: center;
  width: ${props => props.width}em;
`;
const TreeNode = styled.section`
  box-sizing: border-box;
  display: inline-block;
  width: ${CommonStyles.TreenodeWidth}em;
  height: 6em;
  min-height: 3.3em;
  line-height: 1.3em;
  border: 2.0px solid #BD8565;
  border-radius: 1em;
  background-color: rgba(255,255,255,1);
  box-shadow: inset 0px 0px 6px 2px #EFDECD;
  margin: 0 ${CommonStyles.TreenodeMargin}em;
  padding: 0.5em 1.5em;
  /* z-indexing over connectors */
  position: relative;
  z-index: 2;
`;
const TreeChildrenSection = styled.section`
  position: relative;
  vertical-align: top;
  display: block;
  margin-top: 4em;
  z-index: 0;
`;

interface TreeMemberProps {
  allowPartners: boolean
  editable: boolean
  children: any
  onEdit: any
  id: any
  onUpdateStatus: any
  handleToggleEditable: any
  onAddPartner: any
  onAddChild: any
  onDelete: any
  partners: any
  status: 'valid' | 'invalid'
  name: string
}

interface TreeMemberState {
  allowPartners: boolean
  editable: boolean
}

class TreeMember extends React.Component <TreeMemberProps, TreeMemberState>{
  id: any
  constructor(props: TreeMemberProps) {
    super(props);

    this.state = {
      allowPartners: this.props.allowPartners === undefined ? true : this.props.allowPartners,
      editable: this.props.editable === undefined ? false : this.props.editable,
    }

    //this.handleAddPartner = this.handleAddPartner.bind(this);
    //this.handleAddChild = this.handleAddChild.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleToggleEditable = this.handleToggleEditable.bind(this);
    this.handleUpdateStatus = this.handleUpdateStatus.bind(this);
  }

  getChildCount() {
    let c = 0;
    for (var key in this.props.children) {
      if (!this.props.children.hasOwnProperty(key)) continue;
      c+= this.props.children[key].length;
    }
    return c;
  }

  // position calculation

  getLinkerProps(p: any, pindex: any) {
    return TreeDimensionCalc.getLinkerProps(p, pindex, this.props);
  }

  handleToggleEditable() {
    this.setState(prevState => ({
      editable: !prevState.editable
    }));
  }

  handleEdit(e: React.MouseEvent) {
    const target = e.target;
    //@ts-ignore
    const value = target.type === 'checkbox' ? target.checked : target.value;
    //@ts-ignore
    return this.props.onEdit(this.props.id, { [target.name]: value });
  }

  handleUpdateStatus(e: React.MouseEvent) {
    return this.props.onUpdateStatus(this.props.id);
  }

  renderField(name: string) {
    if (!this.state.editable) return this.props.status === 'valid' ? this.props.name : this.props.name + " (deceased)";
    //@ts-ignore
    return <input type="text" name={name} value={this.props[name]} onChange={this.handleEdit} />;
  }

  renderActions() {
    return <TreeNodeMenu
      id={this.props.id}
      allowPartners={this.state.allowPartners}
      partners={this.props.partners}
      editable={this.state.editable}
      onUpdateStatus={this.handleUpdateStatus}
      onToggleEditable={this.handleToggleEditable}
      onAddPartner={this.props.onAddPartner}
      onAddChild={this.props.onAddChild}
      onDelete={this.props.onDelete}
    />;
  }

  renderPartners() {
    return <TreeListPartners
      members={this.props.partners}
      onAddPartner={this.props.onAddPartner}
      onAddChild={this.props.onAddChild}
      onEdit={this.props.onEdit}
      onDelete={this.props.onDelete}
      onUpdateStatus={this.props.onUpdateStatus}
    />
  }

  renderChildren() {
    if (this.props.partners.length === 0) return null;
    if (this.getChildCount() === 0) return null;
    return (
      <TreeChildrenSection>
        <VisuallyHiddenHeader>Enfants</VisuallyHiddenHeader>
        {this.props.partners.map((parent:any, i:number) =>
          <TreeListChildren
            key = {parent.id + '_children_' + i}
            members={this.props.children[parent.id]}
            parent={parent}
            onAddPartner={this.props.onAddPartner}
            onAddChild={this.props.onAddChild}
            onEdit={this.props.onEdit}
            onDelete={this.props.onDelete}
            linkprops={this.getLinkerProps(parent.id, i)}
            onUpdateStatus={this.props.onUpdateStatus}
            />
        )}
      </TreeChildrenSection>
    );
  }

  render() {
    return (
      //@ts-ignore
      <TreeTrunk id={this.id} width={TreeDimensionCalc.getMemberWidth(this.props)}>
        <TreeNode>
          <form>
            <TreeHeader>{this.renderField("name")}</TreeHeader>
            {this.renderActions()}
          </form>
        </TreeNode>
        {this.renderPartners()}
        {this.renderChildren()}
      </TreeTrunk>
    );
  }

}


export default TreeMember;
