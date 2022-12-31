import React, { Component } from 'react';
import { ArrowBackOutlined, Search } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import InputRange from 'react-input-range';
import "react-input-range/lib/css/index.css";
import axios from "axios";
import { isMobile } from "react-device-detect";

import "./searchEngin.scss";
//import imdb from "../../image/imdb.png";
import SearchItem from '../../component/searchItem/SearchItem';
//import MovieItem from "../../pages/movieItem/MovieItem";
import logo from "../../images/medilogo.png"

function CheckBox({ name, value, tick, onCheck }) {
    return (
        <p>
            {value}
            <input
                className={"checkBox"}
                name={name}
                type="checkbox"
                value={value}
                checked={tick || false}
                onChange={onCheck}
            />
        </p>
    );
}
function CheckBoxList({ options, isCheckedAll, onCheck }) {
    const checkBoxOptions = (
        <div className="checkbox-list">
            {options.map((option, index) => {
                return (
                    <CheckBox key={index} name={option.name} value={option.value} tick={option.checked} onCheck={(e) => onCheck(option.value, e.target.checked)} />
                );
            })}
        </div>
    );
    return (
        <div className="checkbox-list">
            <p>
                انتخاب همه
                <input
                    className={"checkBox"}
                    name={"select-all"}
                    type="checkbox"
                    value={"ALL"}
                    checked={isCheckedAll}
                    onChange={(e) => onCheck('all', e.target.checked)}
                />
            </p>
            {checkBoxOptions}
        </div>
    );
}

const GoBack = () => {
    const history = useHistory();

    return (
        <div className={"back"} onClick={() => history.goBack()}>
            <ArrowBackOutlined className={"icon"} />
            بازگشت
        </div>
    )
}
const GoBackMob = () => {
    const history = useHistory();

    return (
        <div style={{ fontSize: "50px" }} className={"back"} onClick={() => history.goBack()}>
            <ArrowBackOutlined className={"icon"} />
        </div>
    )
}

class SearchEngin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isScrolled: false,
            yearValue: { min: 1250, max: 2018 },
            isSelectedAll: true,
            isSelectedAll2: true,
            titleList: [
            ],
            checkList: [
                {
                    name: "cat1",
                    value: "پزشکی",
                    checked: true,
                },
                {
                    name: "cat1",
                    value: "پرستاری",
                    checked: true,
                },
                {
                    name: "cat1",
                    value: "علوم آزمایشگاهی",
                    checked: true,
                },
                {
                    name: "cat1",
                    value: "پیراپزشکی",
                    checked: true,
                },
            ],
            checkList2: [
                {
                    name: "cat2",
                    value: "فوریتهای پزشکی",
                    checked: true,
                },
                {
                    name: "cat2",
                    value: "رادیولوژی",
                    checked: true,
                },
                {
                    name: "cat2",
                    value: "اتاق عمل",
                    checked: true,
                },
                {
                    name: "cat2",
                    value: "هوشبری",
                    checked: true,
                },
            ],
            data: [],
            isBook: true,
            titleType: "1",
            searchText: "",
            filter: false,

            isOpen: false,
            haveText: "",

            status: 0,

            movieItem: false,
            movie: null,
            isLand: null,

            windowWidth: window.innerWidth,
            windowHeight: window.innerHeight,
            orientation: '',

            open: false,
        };
    }

    componentDidMount() {
        //this.getRandomLists();
        if (window.innerWidth > window.innerHeight) {
            this.setState({ isLand: true });
        } else if (window.innerWidth < window.innerHeight) {
            this.setState({ isLand: false });
        }

        const { windowWidth, windowHeight } = this.state;
        window.addEventListener("resize", this.handleResize);
        if (windowWidth > windowHeight) {
            this.setState({ orientation: 'landscape-primary' });
        } else {
            this.setState({ orientation: 'portrait-primary' });
        }
    }
    componentWillUnmount() {
        const { windowWidth, windowHeight } = this.state;
        window.addEventListener("resize", this.handleResize);
        if (windowWidth > windowHeight) {
            this.setState({ orientation: 'landscape-primary' });
        } else {
            this.setState({ orientation: 'portrait-primary' });
        }
    }

    handleResize = () => {
        this.setState({ windowWidth: window.innerWidth });
        this.setState({ windowHeight: window.innerHeight });

        const { windowWidth, windowHeight } = this.state;
        if (windowWidth > windowHeight) {
            this.setState({ orientation: 'landscape-primary' });
        } else {
            this.setState({ orientation: 'portrait-primary' });
        }
        console.log(this.state.orientation)
    };

    // getOrientation = () => {
    //     if (this.refs.rootView) {
    //         if (Dimensions.get('window').width < Dimensions.get('window').height) {
    //             this.setState({ orientation: 'portrait' });
    //         } else {
    //             this.setState({ orientation: 'landscape' });
    //         }
    //     }
    // }

    getRandomLists = async () => {
        try {
            const res = await axios.get("/movies");
            this.setState({ data: res.data });
        } catch (err) {
            console.log(err);
        }
    };

    onRadioChange = (e) => {
        this.setState({ titleType: e.target.value });
        if (e.target.value === "3") {
            this.setState({ filter: true });
        } else {
            this.setState({ filter: false });
        }
    }

    onSwitchChange = () => {
        this.setState({ isBook: !this.state.isBook });
    }

    onCheckBoxChange(checkName, isSelected) {
        let isAllChecked = (checkName === 'all' && isSelected);
        let isAllUnChecked = (checkName === 'all' && !isSelected);
        const checked = isSelected;

        const checkList = this.state.checkList.map((color, index) => {
            if (isAllChecked || color.value === checkName) {
                return Object.assign({}, color, {
                    checked,
                });
            } else if (isAllUnChecked) {
                return Object.assign({}, color, {
                    checked: false,
                });
            }

            return color;
        });

        let isCheckedAll = (checkList.findIndex((item) => item.checked === false) === -1) || isAllChecked;

        this.setState({
            checkList,
            isSelectedAll: isCheckedAll,
        });
    }

    onCheckBoxChange2(checkName, isSelected) {
        let isAllChecked = (checkName === 'all' && isSelected);
        let isAllUnChecked = (checkName === 'all' && !isSelected);
        const checked = isSelected;

        const checkList = this.state.checkList2.map((color, index) => {
            if (isAllChecked || color.value === checkName) {
                return Object.assign({}, color, {
                    checked,
                });
            } else if (isAllUnChecked) {
                return Object.assign({}, color, {
                    checked: false,
                });
            }

            return color;
        });

        let isCheckedAll = (checkList.findIndex((item) => item.checked === false) === -1) || isAllChecked;

        this.setState({
            checkList2: checkList,
            isSelectedAll2: isCheckedAll,
        });
    }

    onSubmitTitle = (e) => {
        if (e.key === 'Enter') {
            this.startSearch(e.target.value);
        }

    }

    startSearch = async (searchText) => {
        // for (let i = 0; i <= this.state.checkList.length - 1; i++) {
        //     if (this.state.checkList[i].checked === true) {
        //         console.log(this.state.checkList[i].value);
        //     }
        // }
        const { titleType, isBook } = this.state;
        try {
            const res = await axios.post("/api/books/search", {
                titleType: titleType,
                searchText: searchText,
                isBook: isBook,
            });
            this.setState({ data: res.data });
            console.log(res.data)
        } catch (err) {
            console.log(err);
        }
    }
    filterSearch = async () => {
        const { titleType, isBook, checkList, checkList2, yearValue } = this.state;

        let cat1List = [];
        let cat2List = [];
        for (let i = 0; i < checkList.length; i++) {
            if (checkList[i].checked === true) {
                cat1List.push(checkList[i].value);
            }
        }
        for (let i = 0; i < checkList2.length; i++) {
            if (checkList2[i].checked === true) {
                cat2List.push(checkList2[i].value);
            }
        }

        try {
            const res = await axios.post("/api/books/search", {
                titleType: titleType,
                isBook: isBook,
                cat1: cat1List,
                cat2: cat2List,
                minYear: yearValue.min,
                maxYear: yearValue.max,
            });
            this.setState({ data: res.data });
        } catch (err) {
            console.log(err);
        }
    }

    openMenu() {
        this.setState({ open: !this.state.open })
        console.log(this.state.open)
    }

    render() {
        window.onscroll = () => {
            this.setState({ isrolled: window.pageYOffset > 0 });
            return () => (window.onscroll = null);
        }

        const gotoMovieItem = (value, movieValue) => {
            // this.setState({ movieItem: value, movie: movieValue });
        }

        //console.log(this.state.titleList);
        const { filter } = this.state;

        const filterClass = filter ? 'primary' : 'secondary';
        const searchClass = filter ? "secondary" : "primary";

        let { movieItem, movie, isLand, open, orientation } = this.state;

        return (
            isMobile
                ?
                <div className='searchContainerMob'>
                    <div style={{ display: movieItem && "none" }} className='navbarSearchMob'>
                        <div className='right'>
                            <button className={"btn"} onClick={() => this.setState({ open: !this.state.open })}>
                                <div className={open ? "first" : "firstClose"} />
                                <div className={open ? "second" : "secondClose"} />
                                <div className={open ? "third" : "thirdClose"} />
                            </button>
                        </div>
                        <div className='center'>
                            <div className={`searchBox searchBox-${searchClass}`} style={{ backgroundColor: filter ? "green" : "#fff" }}>
                                <Search className={"icon"} style={{ color: filter ? "#fff" : "#000" }} />
                                {!filter ?
                                    <input placeholder={"جستجو کنید"} onKeyDown={this.onSubmitTitle} />
                                    :
                                    <div className={"searchBtn"} type={"button"} onClick={this.filterSearch}>جستجو</div>
                                }
                            </div>
                        </div>
                        <div className='left'>
                            <GoBackMob />
                        </div>
                    </div>

                    <div style={{ display: movieItem && "none" }} className='searchPartMob'>
                        <div className={"searchContent"}>
                            {this.state.data.map(function (item, index) {
                                return (
                                    <SearchItem i={index} item={item} goto={gotoMovieItem} key={index} />
                                );
                            })}
                        </div>

                        <div className={open ? 'menuMob' : 'menuMob menuMobClose'}>
                            <div className={"switchContainer"}>
                                <div className='right'>
                                    <label style={{ color: this.state.isBook ? "rgb(13, 255, 0)" : "rgb(225, 225, 225)", fontSize: "23px" }}>کتاب</label>
                                </div>
                                <div className='center'>
                                    <input
                                        className="react-switch-checkbox"
                                        id={`react-switch-new`}
                                        type="checkbox"
                                        onChange={this.onSwitchChange}
                                    />
                                    <label
                                        className="react-switch-label"
                                        htmlFor={`react-switch-new`}
                                    >
                                        <span className={`react-switch-button`} />
                                    </label>
                                </div>
                                <div className='left'>
                                    <label style={{ color: !this.state.isBook ? "rgb(29, 220, 197)" : "rgb(225, 225, 225)", fontSize: "23px" }}>جزوه</label>
                                </div>
                            </div>

                            <div className={"seperator"} />

                            <label>جستجو بر اساس</label>

                            <p>
                                {this.state.isBook ? "نام کتاب" : "نام جزوه"}
                                <input className={"radio"} type="radio" value={"1"} name={"name"} checked={this.state.titleType === "1"} onChange={this.onRadioChange} />
                            </p>
                            <p>
                                نام نویسنده
                                <input className={"radio"} type="radio" value={"2"} name={"name"} checked={this.state.titleType === "2"} onChange={this.onRadioChange} />
                            </p>
                            <p>
                                فیلترها
                                <input className={"radio"} type="radio" value={"3"} name={"name"} checked={this.state.titleType === "3"} onChange={this.onRadioChange} />
                            </p>

                            <div className={`filterContainer filterContainer-${filterClass}`}>
                                <div className={"seperator"} />
                                <label>دسته بندی اول</label>

                                <div className={"genreContainer"}>
                                    <CheckBoxList options={this.state.checkList} isCheckedAll={this.state.isSelectedAll} onCheck={this.onCheckBoxChange.bind(this)} />
                                </div>

                                <div className={"seperator"} />

                                <label>دسته بندی دوم</label>
                                <div className={"genreContainer"}>
                                    <CheckBoxList options={this.state.checkList2} isCheckedAll={this.state.isSelectedAll2} onCheck={this.onCheckBoxChange2.bind(this)} />
                                </div>

                                <div className={"seperator"} />

                                <div className={"inputRContainer"}>
                                    <label className={"yearLabel"}>سال انتشار</label>
                                    <InputRange
                                        maxValue={2018}
                                        minValue={1250}
                                        value={this.state.yearValue}
                                        onChange={(value) => this.setState({ yearValue: value })}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                :
                <div className={"searchContainer"}>
                    <div style={{ display: movieItem && "none" }} className={"navbarSearch"}>
                        <div className={"container"}>
                            <div className={"left"}>
                                <GoBack />
                            </div>
                            <div className={"right"}>
                                <img className='img' src={logo} alt='' />
                                <div className={`searchBox searchBox-${searchClass}`} style={{ backgroundColor: filter ? "green" : "#fff" }}>
                                    <Search className={"icon"} style={{ color: filter ? "#fff" : "#000" }} />
                                    {!filter ?
                                        <input placeholder={"جستجو کنید"} onKeyDown={this.onSubmitTitle} />
                                        :
                                        <div className={"searchBtn"} type={"button"} onClick={this.filterSearch}>جستجو</div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>

                    <div style={{ display: movieItem && "none" }} className={"searchPart"}>
                        <div className={"searchContent"}>
                            {this.state.data.map(function (item, index) {
                                return (
                                    <SearchItem i={index} item={item} goto={gotoMovieItem} key={index} />
                                );
                            })}
                        </div>

                        <div className={"searchMenu"}>
                            <div className={"switchContainer"}>
                                <label style={{ color: this.state.isBook ? "rgb(13, 255, 0)" : "rgb(225, 225, 225)", fontSize: "23px" }}>کتاب</label>
                                <input
                                    className="react-switch-checkbox"
                                    id={`react-switch-new`}
                                    type="checkbox"
                                    onChange={this.onSwitchChange}
                                />
                                <label
                                    className="react-switch-label"
                                    htmlFor={`react-switch-new`}
                                >
                                    <span className={`react-switch-button`} />
                                </label>
                                <label style={{ color: !this.state.isBook ? "rgb(29, 220, 197)" : "rgb(225, 225, 225)", fontSize: "23px" }}>جزوه</label>
                            </div>

                            <div className={"seperator"} />

                            <label>جستجو بر اساس</label>

                            <p>
                                {this.state.isBook ? "نام کتاب" : "نام جزوه"}
                                <input className={"radio"} type="radio" value={"1"} name={"name"} checked={this.state.titleType === "1"} onChange={this.onRadioChange} />
                            </p>
                            <p>
                                نام نویسنده
                                <input className={"radio"} type="radio" value={"2"} name={"name"} checked={this.state.titleType === "2"} onChange={this.onRadioChange} />
                            </p>
                            <p>
                                فیلترها
                                <input className={"radio"} type="radio" value={"3"} name={"name"} checked={this.state.titleType === "3"} onChange={this.onRadioChange} />
                            </p>

                            <div className={`filterContainer filterContainer-${filterClass}`}>
                                <div className={"seperator"} />
                                <label>دسته بندی اول</label>

                                <div className={"genreContainer"}>
                                    <CheckBoxList options={this.state.checkList} isCheckedAll={this.state.isSelectedAll} onCheck={this.onCheckBoxChange.bind(this)} />
                                </div>

                                <div className={"seperator"} />

                                <label>دسته بندی دوم</label>
                                <div className={"genreContainer"}>
                                    <CheckBoxList options={this.state.checkList2} isCheckedAll={this.state.isSelectedAll2} onCheck={this.onCheckBoxChange2.bind(this)} />
                                </div>

                                <div className={"seperator"} />

                                <div className={"inputRContainer"}>
                                    <label className={"yearLabel"}>سال انتشار</label>
                                    <InputRange
                                        maxValue={2018}
                                        minValue={1250}
                                        value={this.state.yearValue}
                                        onChange={(value) => this.setState({ yearValue: value })}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* {movieItem && <MovieItem search={gotoMovieItem} movie={movie} />} */}
                </div>
        );
    }
}

export default SearchEngin;