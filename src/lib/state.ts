import { type Optional, type State } from "@/types/types";
import { useState } from "react";

export class StateObject<T> {
  value: T;
  set: State<T>;

  constructor(s: [T, State<T>]) {
    this.value = s[0];
    this.set = s[1];
  }
}

export function stobj<T>(s: [T, State<T>]): StateObject<T> {
  return new StateObject(s);
}

export function stobjs<T>(v?: T): StateObject<Optional<T>> {
  "use client";

  return new StateObject(useState<Optional<T>>(v));
}
