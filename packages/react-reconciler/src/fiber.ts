import { Props, Key, Ref, ReactElementType } from 'shared/ReactTypes';
import { FunctionComponent, HostComponent, WorkType } from './workTags';
import { Flags, NoFlags } from './fiberFlags';
import { Container } from 'hostConfig';
// 存放FiberNode
export class FiberNode {
	type: any;
	tag: WorkType;
	pendingProps: Props;
	key: Key;
	stateNode: any;
	ref: Ref;
	return: FiberNode | null;
	sibling: FiberNode | null;
	child: FiberNode | null;
	index: number;
	memorizedProps: Props | null;
	memorizedState: any;

	alternate: FiberNode | null;
	flags: Flags;
	subtreeFlags: Flags;
	updateQueue: unknown;

	constructor(tag: WorkType, pendingProps: Props, key: Key) {
		this.tag = tag;
		this.key = key;
		// HostComponent 如<div> DOM
		this.stateNode = null;
		// FunctionComponent ()=>{} 函数本身
		this.type = null;
		// 树结构
		// 指向父fiberNode
		this.return = null;
		this.sibling = null;
		this.child = null;
		this.index = 0;
		this.ref = null;
		// 作为工作单元
		this.pendingProps = pendingProps;
		this.memorizedProps = null;
		this.memorizedState = null;
		this.updateQueue = null;

		this.alternate = null;

		//副作用
		this.flags = NoFlags;
		this.subtreeFlags = NoFlags;
	}
}

export class FiberRootNode {
	container: Container;
	current: FiberNode;
	finishedWork: FiberNode | null;

	constructor(container: Container, hostRootFiber: FiberNode) {
		this.container = container;
		this.current = hostRootFiber;
		hostRootFiber.stateNode = this;
		this.finishedWork = null;
	}
}
export const createWorkInProgress = (
	current: FiberNode,
	pendingProps: Props
): FiberNode => {
	let wip = current.alternate;
	if (wip === null) {
		// mount
		wip = new FiberNode(current.tag, pendingProps, current.key);
		wip.stateNode = current.stateNode;
		wip.alternate = current;
		current.alternate = wip;
	} else {
		// update
		wip.pendingProps = pendingProps;
		// 清除副作用
		wip.flags = NoFlags;
		wip.subtreeFlags = NoFlags;
	}
	wip.type = current.type;
	wip.updateQueue = current.updateQueue;
	wip.child = current.child;
	wip.memorizedProps = current.memorizedProps;
	wip.memorizedState = current.memorizedState;
	return wip;
};

export function createFiberFromElement(element: ReactElementType) {
	const { type, key, props } = element;
	let fiberTag: WorkType = FunctionComponent;

	if (typeof type === 'string') {
		fiberTag = HostComponent;
	} else if (typeof type !== 'function' && __DEV__) {
		console.warn('未定义的类型');
	}

	const fiber = new FiberNode(fiberTag, props, key);
	fiber.type = type;

	return fiber;
}
