import styled from "styled-components";

export const Container = styled.div`
    display:flex;
    align-items:center;
    justify-content: start;
    width: 400px;
    flex-direction:column;
    border-right: 2px solid var(--highlight);
    height: 100vh;
`

export const Topbar = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    width:100%;
`
export const ProfileTab = styled.div`
    display:flex;
    align-items:center;
    width:90%;
    margin-block:3rem;
    &>h1{
        display:flex;
        flex-grow:1;
        font-weight:800;
        font-size:25px;
    }
`
export const SearchTab = styled.div`
    width:90%;

    margin-bottom:1rem;
`
export const SearchResults = styled.div`
    margin-block:10px;
    width:100%;
    height:fit-content;
    z-index:10;
    border-radius:10px;
    background-color:var(--white);
    overflow-x:hidden;
    & .searchSection{
        display:flex;
        justify-content:space-between;
        align-items:center;
    }
    &>div{
        cursor:pointer;
        margin-top:5px;
        display:flex;
        align-items:center;
        justify-content:center;
        font-size:1.6rem;
        padding-block:5px;
        width:100%;
        &:hover{
            background-color:var(--highlight);
        }
    }
`
export const SearchHeaderTag = styled.h1`
    font-size:2rem;
    width:100%;
    text-align:center;
`

export const ProfileImage = styled.img`
    width:40px;
    height:40px;
    border-radius:50%;
    margin-right:15px;
`
export const BottomSection = styled.div`
    border-top:2px solid var(--highlight);
    width:100%;
    display:flex;
    flex-direction:column;
`

export const SuggestedUser = styled.div`
    display:flex;
    flex-direction:column;
    align-items:flex-start;
    &>h1{
        margin:10px;
    }
    & .suggested_name_holder{
        width:100%;
        padding:10px;
        display:flex;
        align-items:center;
        /* justify-content:center; */
        font-size:1.6rem;
        cursor: pointer;
        &>img{
            height:40px;
            width:40px;
            display:flex;
            align-items:center;
            justify-content:center;

            border-radius:50%;
            margin-right:20px;

        }
        &:hover{
            background-color:var(--highlight);
        }
    }
`