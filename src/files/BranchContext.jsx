import React, { createContext, useContext, useState } from "react";

/**
 * ============================================================================
 * React Context API - Basic Example (BranchContext)
 * ============================================================================
 * 
 * 1. CREATE CONTEXT:
 *    createContext() initializes a new Context object.
 */
export const BranchContext = createContext();

/**
 * 2. PROVIDER COMPONENT:
 *    Wraps child components and supplies state (branch, setBranch) to all
 *    components in its tree via the `value` prop.
 */
export function BranchProvider({ children }) {
  // State managed globally in Context
  const [branch, setBranch] = useState("CSE");

  return (
    <BranchContext.Provider value={{ branch, setBranch }}>
      {children}
    </BranchContext.Provider>
  );
}

/**
 * 3. CUSTOM HOOK (Consumer):
 *    Convenient helper hook so components can simply call `useBranch()`
 *    instead of importing both useContext and BranchContext every time.
 */
export function useBranch() {
  const context = useContext(BranchContext);
  if (!context) {
    throw new Error("useBranch must be used within a BranchProvider");
  }
  return context;
}
