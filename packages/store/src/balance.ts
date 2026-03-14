"use client"
import { useState } from "react";

export const useBalance = () => {
  const [balance, setBalance] = useState(0);
  return balance;
};
