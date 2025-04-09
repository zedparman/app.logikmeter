"use client";
import { useSession } from "next-auth/react";
import React from 'react'

const DashboardHomeComponent = () => {
  const sesseion = useSession();
  // console.log(sesseion);
  return (
    <div>DashboardHomeComponent</div>
  )
}

export default DashboardHomeComponent