interface Tree {
    id: string;
    name: string;
    status: Status
    partners: Tree;
    children: Tree
}

type Status = 'valid' | 'invalid'


export const bfs = (tree: any, key: string, collection: any) => {
	if (!tree[key] || tree[key].length === 0) return;
	for (var i=0; i < tree[key].length; i++) {
		var child = tree[key][i]
		collection[child.id] = child;
		bfs(child, key, collection);
	}
	return;
}