'use client'
import React from "react";
import { Drawer,Box,Typography,IconButton} from "@mui/material";
import { Search } from "@mui/icons-material";
import { useState } from "react";

//styles
import styles from "./Sidenav.module.css"

const Sidenav = () => {

 const [isSideNavOpen,setIsSideNavOpen] = useState(false)


  return(
  <>
  <IconButton size="large" edge="start" color="inherit" aria-label="logo" onClick={() => setIsSideNavOpen(true)}>
    <Search className={styles["search-icon"]}/>
  </IconButton>
  <Drawer sx={{width:"1000px"}} className={styles["drawer"]} anchor="left" open={isSideNavOpen} onClose={() => setIsSideNavOpen(false)}>
    <div className={styles["drawer-wrapper"]}>
    <div className={styles["search-wrapper"]}>
       <div className={styles["search-naslov"]}>
        <h1>Find your book.</h1>
        </div>

    <div className={styles["input-box"]}>
        
    <IconButton   edge="start" color="inherit" aria-label="logo" onClick={() => setIsSideNavOpen(true)}>
    <Search className={styles["input-search-icon"]} />
  </IconButton>
        <input placeholder="Search book..." type="text" name="book-name" />
    </div>

    <div className={styles["check-box-container"]}>
    <label className={styles["form-control"]}>
  <input type="checkbox" name="checkbox" />
  Self Improvment
</label>

<label className={styles["form-control"]}>
  <input type="checkbox" name="checkbox-checked"  />
  Psyhology
</label>
<label className={styles["form-control"]}>
  <input type="checkbox" name="checkbox-checked"  />
  Fantasy
</label>
<label className={styles["form-control"]}>
  <input type="checkbox" name="checkbox-checked"  />
  Horror
</label>
<label className={styles["form-control"]}>
  <input type="checkbox" name="checkbox-checked"  />
  Classic
</label>
<label className={styles["form-control"]}>
  <input type="checkbox" name="checkbox-checked"  />
Thriller 
    </label>
    <label className={styles["form-control"]}>
  <input type="checkbox" name="checkbox-checked"  />
  Sci fi
</label>
    </div>
    <div className={styles["list-choice"]}>
  <div className={styles["list-choice-title"]}>Month</div>
  <div className={styles["list-choice-objects"]}>
    <label>
      <input type="radio" name="month"/>                         <span>January</span>
    </label>
    <label>
      <input type="radio" name="month"/>                         <span>February</span>
    </label>
    <label>
      <input type="radio" name="month"/>                         <span>March</span>
    </label>
    <label>
      <input type="radio" name="month"/>                         <span>April</span>
    </label>
    <label>
      <input type="radio" name="month"/>                         <span>May</span>
    </label>
    <label>
      <input type="radio" name="month"/>                         <span>June</span>
    </label>
    <label>
      <input type="radio" name="month"/>                         <span>July</span>
    </label>
    <label>
      <input type="radio" name="month"/>                         <span>September</span>
    </label>
    <label>
      <input type="radio" name="month"/>                         <span>October</span>
    </label>
    <label>
      <input type="radio" name="month"/>                         <span>November</span>
    </label>
    <label>
      <input type="radio" name="month"/>                         <span>December</span>
    </label>
  </div>
</div>
    

    </div>
    </div>

  </Drawer>
  </>
);
  }

export default Sidenav;
