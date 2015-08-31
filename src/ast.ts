// Copyright 2013 Bobby Powers. All rights reserved.
// Use of this source code is governed by the MIT
// license that can be found in the LICENSE file.

'use strict';

import SourceLoc from './lex';

interface Node {
	pos: SourceLoc;
	end: SourceLoc; // the char after this token
}

export class Ident implements Node {
	name: string;
	_pos: SourceLoc;

	constructor(pos: SourceLoc, name: string) {
		this.name = name;
		this._pos = pos;
	}

	get pos(): SourceLoc { return this._pos; }
	get end(): SourceLoc { return this._pos + this.name.length; }
}

export class Constant implements Node {
	value: number;
	_pos: SourceLoc;
	_len: number;

	constructor(pos: SourceLoc, value: string) {
		this.value = parseFloat(value);
		this._pos = pos;
		this._len = value.length;
	}

	get pos(): SourceLoc { return this._pos; }
	get end(): SourceLoc { return this._pos.off(this._len); }
}

export class ParenExpr implements Node {
	x: Node;
	_lPos: SourceLoc;
	_rPos: SourceLoc;

	constructor(lPos: SourceLoc, x: Node, rPos: SourceLoc) {
		this.x = x;
		this._lPos = lPos;
		this._rPos = rPos;
	}

	get pos(): SourceLoc { return this._lPos; }
	get end(): SourceLoc { return this._rPos.off(1); }
}

export class CallExpr implements Node {
	fun: Node;
	args: Node[];

	_lParenPos: SourceLoc;
	_rParenPos: SourceLoc;

	constructor(fun: Node, lParenPos: SourceLoc, args: Node[], rParenPos: SourceLoc) {
		this.fun = fun;
		this.args = args;
		this._lParenPos = lParenPos;
		this._rParenPos = rParenPos;
	}

	get pos(): SourceLoc { return this.fun.pos(); }
	get end(): SourceLoc { return this._rParenPos + 1; }
}

export class UnaryExpr implements Node {
	op: string;
	x: Node;
	_opPos: SourceLoc;

	constructor(opPos, op, x) {
		this.op = op;
		this.x = x;
		this._opPos = opPos;
	}

	get pos(): SourceLoc { return this._opPos; }
	get end(): SourceLoc { return this.x.end(); }
}

export class BinaryExpr implements Node {
	op: string;
	l: Node;
	r: Node;
	_opPos: SourceLoc;

	constructor(l: Node, opPos: SourceLoc, op: string, r: Node) {
		this.l = l;
		this.op = op;
		this.r = r;
		this._opPos = opPos;
	}

	get pos(): SourceLoc { return this.x.pos(); }
	get end(): SourceLoc { return this.y.end(); }
}

export class IfExpr implements Node {
	cond: Node;
	t: Node;
	f: Node;
	_ifPos: SourceLoc;
	_thenPos: SourceLoc;
	_elsePos: SourceLoc;

	constructor(ifPos: SourceLoc, cond: Node, thenPos: SourceLoc, t: Node, elsePos: SourceLoc, f: Node) {
		this.cond = cond;
		this.t = t;
		this.f = f;
		this._ifPos = ifPos;
		this._thenPos = thenPos;
		this._elsePos = elsePos;
	}

	get pos(): SourceLoc { return this._ifPos; }
	get end(): SourceLoc { return this.b.end(); }
}