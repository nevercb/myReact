import internals from 'shared/internals';
import { FiberNode } from './fiber';

const { currentDispatcher } = internals;

let currentlyRenderingFiber: FiberNode | null = null;
let workInProgressHook: Hook | null = null;

interface Hook {
	memorizedState: any;
	updateQueue: unknown;
	next: Hook | null;
}

export function renderWithHooks(wip: FiberNode) {
	// 赋值操作
	currentlyRenderingFiber = wip;
	wip.memorizedState = null;

	const current = wip.alternate;

	if (current !== null) {
		// update
		return;
	} else {
		// mount
		// currentDispatcher.current =
		return;
	}

	const Component = wip.type;
	const props = wip.pendingProps;
	const children = Component(props);

	//重置操作
	currentlyRenderingFiber = null;
	return children;
}
