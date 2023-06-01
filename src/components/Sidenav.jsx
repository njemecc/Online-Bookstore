"use client";
import React from "react";
import { Drawer, Slider, IconButton } from "@mui/material";
import { useState } from "react";

//styles
import styles from "./Sidenav.module.css";

//redux
import { useSelector, useDispatch } from "react-redux";
import { cartActions } from "@/store/slices/cartSlice";

//icons
import { FaSearch } from "@react-icons/all-files/fa/FaSearch";

const Sidenav = () => {
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const booksToShow = useSelector((state) => state.cart.libraryBooksToShow);
  const dispatch = useDispatch();

  const backupBooksToShow = useSelector(
    (state) => state.cart.libraryBooksToShowCopy
  );

  const mark = [
    {
      value: 0,
      label: "0$",
    },
    {
      value: 10,
      label: "10$",
    },

    {
      value: 36,
      label: "36$",
    },
    {
      value: 25,
      label: "25$",
    },
    {
      value: 50,
      label: "50$",
    },
    {
      value: 100,
      label: "100$",
    },
  ];

  console.log(booksToShow);

  const searchInputChangeHandler = (e) => {
    setSearchText(e.target.value);
    if (e.target.value == "") {
      dispatch(cartActions.changeBooksLibrary(backupBooksToShow));
    } else {
      const newBooks = booksToShow.filter((book) =>
        book.name.toLowerCase().includes(e.target.value.toLowerCase())
      );
      dispatch(cartActions.changeBooksLibrary(newBooks));
    }
  };

  const SearchByCategoryHandler = (e) => {
    const genre = e.target.name;

    const genreBooks = backupBooksToShow.filter(
      (book) => book.genre.toLowerCase() == genre.toLowerCase()
    );

    dispatch(cartActions.changeBooksLibrary(genreBooks));
  };

  const searchByWritterHandler = (e) => {
    const writer = e.target.name;

    const writerBooks = backupBooksToShow.filter(
      (book) => book.author.toLowerCase() == writer.toLowerCase()
    );

    dispatch(cartActions.changeBooksLibrary(writerBooks));
  };

  const searchByPriceHandler = (e) => {
    const price = e.target.value;
    const priceBooks = backupBooksToShow.filter(
      (book) => Number(book.price.substring(0, book.price.length - 1)) == price
    );
    dispatch(cartActions.changeBooksLibrary(priceBooks));
  };

  return (
    <>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="logo"
        onClick={() => setIsSideNavOpen(true)}
      >
        <FaSearch className={styles["search-icon"]} />
      </IconButton>
      <Drawer
        sx={{ width: "1000px" }}
        className={styles["drawer"]}
        anchor="left"
        open={isSideNavOpen}
        onClose={() => setIsSideNavOpen(false)}
      >
        <div className={styles["drawer-wrapper"]}>
          <div className={styles["search-wrapper"]}>
            <div className={styles["search-naslov"]}>
              <h1>Find your book.</h1>
            </div>

            <div className={styles["input-box"]}>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="logo"
                onClick={() => setIsSideNavOpen(true)}
              >
                <FaSearch className={styles["input-search-icon"]} />
              </IconButton>
              <input
                placeholder="Search book..."
                type="text"
                name="book-name"
                onInput={searchInputChangeHandler}
              />
            </div>

            <div className={styles["check-box-container"]}>
              <label className={styles["form-control"]}>
                <input
                  onChange={SearchByCategoryHandler}
                  type="checkbox"
                  name="self improvement"
                />
                Self Improvment
              </label>

              <label className={styles["form-control"]}>
                <input
                  onChange={SearchByCategoryHandler}
                  type="checkbox"
                  name="psyhology"
                />
                Psyhology
              </label>
              <label className={styles["form-control"]}>
                <input
                  onChange={SearchByCategoryHandler}
                  type="checkbox"
                  name="fantasy"
                />
                Fantasy
              </label>
              <label className={styles["form-control"]}>
                <input
                  onChange={SearchByCategoryHandler}
                  type="checkbox"
                  name="horror"
                />
                Horror
              </label>
              <label className={styles["form-control"]}>
                <input
                  onChange={SearchByCategoryHandler}
                  type="checkbox"
                  name="classic"
                />
                Classic
              </label>
              <label className={styles["form-control"]}>
                <input
                  onChange={SearchByCategoryHandler}
                  type="checkbox"
                  name="thriller"
                />
                Thriller
              </label>
              <label className={styles["form-control"]}>
                <input
                  onChange={SearchByCategoryHandler}
                  type="checkbox"
                  name="sci-fi"
                />
                Sci fi
              </label>
            </div>
            <div className={styles["slider-div"]}>
              <Slider
                onChange={searchByPriceHandler}
                defaultValue={10}
                max={100}
                marks={mark}
              />
            </div>
            <div className={styles["list-choice"]}>
              <div className={styles["list-choice-title"]}>Writter</div>
              <div className={styles["list-choice-objects"]}>
                <label>
                  <input
                    onClick={searchByWritterHandler}
                    type="radio"
                    name="George R.R. Martin"
                  />{" "}
                  <span>George R.R. Martin</span>
                </label>
                <label>
                  <input
                    onClick={searchByWritterHandler}
                    type="radio"
                    name="J.R.R Tolkien"
                  />{" "}
                  <span>J.R.R Tolkien</span>
                </label>
                <label>
                  <input
                    onClick={searchByWritterHandler}
                    type="radio"
                    name="Robert Kyosaki"
                  />{" "}
                  <span>Robert Kyosaki</span>
                </label>
                <label>
                  <input
                    onClick={searchByWritterHandler}
                    type="radio"
                    name="Napoleon Hill"
                  />{" "}
                  <span>Napoleon Hill</span>
                </label>
                <label>
                  <input
                    onClick={searchByWritterHandler}
                    type="radio"
                    name="Peter Thiel"
                  />{" "}
                  <span>Peter Thiel</span>
                </label>
                <label>
                  <input
                    onClick={searchByWritterHandler}
                    type="radio"
                    name="Morgan Housel"
                  />{" "}
                  <span>Morgan Housel</span>
                </label>
              </div>
            </div>
            {/* <div className={styles["search-button-div"]}>
              <button
                onClick={searchByParametersHandler}
                className={styles["search-button"]}
              >
                Search
              </button>
            </div> */}
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default Sidenav;
