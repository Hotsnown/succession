export class TreeNode {

    static TreeNodeLUT: Map<number, TreeNode>  = new Map<number, TreeNode>();
    
    parent: TreeNode | null;
    id: number;
    label: string;
    children: TreeNode[] = [];
  
    private constructor(_id: number, label: string) {
      this.parent = null;
      this.id = _id;
      this.label = label;
      TreeNode.TreeNodeLUT.set(this.id, this);
    }

    public static getTreeNode(id: number) {
        return TreeNode.TreeNodeLUT.get(id);
    }
    
    public static create(_id: number, _label: string, _parent?: number): TreeNode {
        let parent
        if (_parent) {
            parent = TreeNode.TreeNodeLUT.get(_parent);
        }
        const treeNode = new TreeNode(_id, _label);
        if (parent) {
            parent.addChild(treeNode);
        }
        return treeNode;
    }
  
    private addChild(child: TreeNode): void {
      this.children.push(child);
      child.setParent(this);
    }
  
    private setParent(_parent: TreeNode): void {
      this.parent = _parent;
    }
  
    /**
     * Find the route from this TreeNode, to some descendant TreeNode with id [descendentId]
     */
    public getDescendentPathTo(descendentId: number): TreeNode[] | null {
      const results: TreeNode[] = [];
      results.push(this);
      if(this.id === descendentId) {
        return results;
      }
      for(let child of this.children) {
        const temp = child.getDescendentPathTo(descendentId);
        if(temp != null) {
          results.push(...temp);
          return results;
        }
      }
      return null;
    }
  
    /**
     * Find the route from this TreeNode, to some ancestral TreeNode with id [descendentId]
     */
    public getAncestorPathTo(ancestorId: number): TreeNode[] | null {
      const results: TreeNode[] = [];
      results.push(this);
      if (this.id === ancestorId) {
        return results;
      }
      if (this.parent) {
        const temp = this.parent.getAncestorPathTo(ancestorId);
        if (temp) {
            results.push(...temp);
            return results
        }
      }
      return null;
    }
  
    public toString(): string {
      return `{id: ${this.id}, label: ${this.label}}`;
    }
  }