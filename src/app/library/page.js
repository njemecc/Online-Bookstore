'use client'
import React from "react";
import Sidenav from "@/components/Sidenav";
import BookItem from "@/components/BookItem";
import AllBooks from "@/components/AllBooks";

const LibraryPage = () => {
  return <>
  <Sidenav/>
<AllBooks/>
  </>;
};

export default LibraryPage;
