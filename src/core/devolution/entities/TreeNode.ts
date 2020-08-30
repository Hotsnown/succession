/* prettier-ignore */
/*eslint-disable*/

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
  
    get root(): TreeNode {
      return this.parent ? this.parent.root : this;
    }

    public static getTreeNode(id: number) {
      return TreeNode.TreeNodeLUT.get(id);
    }

    private get firstChild(): TreeNode | null {
      return this.children[0];
    }
  
    private get nextSibling(): TreeNode | undefined {
      if (this.parent) return this.parent.children[this.parent.children.indexOf(this) + 1];
    }

    private get parentNext(): TreeNode | undefined {
      if (this.parent) return this.parent.nextSibling || this.parent.parentNext;
    }

    public get next(): TreeNode | undefined {
      return this.firstChild || this.nextSibling || this.parentNext;
    }

    public get grandParent(): TreeNode | null {
      if (this.parent) {
        if (this.parent.parent) {
          return this.parent.parent
        }
      }
      return null
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
        if(temp) {
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

    public isRoot(): boolean {
      return this.parent === null;
    }
  
    public isLeaf(): boolean {
      return this.children.length === 0;
    }
  
    public getLevel(): number {
      if (this.isRoot()) return 0;
      else {
        return this.parent!.getLevel() + 1;
      }
    }

    public isChildOf(that: this): boolean {
      if (this.parent === that) return true;
      if (this.parent) return this.parent.isChildOf(that);
      return false;
    }
  
    public *descendants(): Iterable<TreeNode> {
      for (const child of this.children) {
        yield child;
        yield* child.descendants();
      }
    }
  
    public *ancestors(): Iterable<TreeNode> {
      if (this.parent) {
        yield* this.parent.ancestors();
        yield this.parent;
      }
    }
  }