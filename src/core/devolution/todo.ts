export class TreeNode {
     val: number
     left: TreeNode | null
     right: TreeNode | null
     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
         this.val = (val===undefined ? 0 : val)
         this.left = (left===undefined ? null : left)
         this.right = (right===undefined ? null : right)
     }
 }
/* 
export function isCousins(root: TreeNode | null, x: number, y: number): boolean {
    const [dx, px, dy, py] = dfs(root, null, 0, x).concat(dfs(root, null, 0, y))
    return dx === dy && px === py

    function dfs(
      node: TreeNode, 
      parent: TreeNode, 
      depth: number, 
      mod: number
      ): any {
      if (node) {
        if (node.val === mod) {
          return [depth, parent]
        }
        return dfs(node.left, node, depth + 1, mod) || 
               dfs(node.right, node, depth + 1, mod)
      }
  }
} */