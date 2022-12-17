import { Dispatch, FunctionComponent, SetStateAction } from "react";

import Image from "next/image";

import styled from "styled-components";
import color from "../../styles/color";

import SearchIcon from "../../public/images/svg/search-icon.svg";

interface Props {
  searchValue: string;
  setSearchValue: Dispatch<SetStateAction<string>>;
}

export const SearchInput: FunctionComponent<Props> = (props) => {
  const { searchValue, setSearchValue } = props;

  return (
    <SearchContainer>
      <SearchIconContainer>
        <Image src={SearchIcon} fill={true} sizes="1.3rem" alt="search icon" />
      </SearchIconContainer>

      <SearchText
        type="text"
        placeholder="search"
        value={searchValue}
        onChange={(event) => {
          setSearchValue(event.target.value);
        }}
      />
    </SearchContainer>
  );
};

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.625rem;

  height: 2.3rem;

  padding: 0.6rem 1.4rem;

  border-radius: 3rem;
  background-color: ${color.grey["700"]};
`;

const SearchIconContainer = styled.div`
  position: relative;

  width: 1.3rem;
  height: 1.3rem;
`;

const SearchText = styled.input`
  border: none;

  color: ${color.white};
  background-color: ${color.grey["700"]};

  font-family: "Inter", serif;
  font-style: normal;
  font-weight: 500;
  font-size: 1rem;
  line-height: 1.2rem;

  width: 5.5rem;
  transition: width 0.2s ease-out;

  ::placeholder,
  ::-webkit-input-placeholder {
    color: ${color.grey["400"]};
  }

  &:focus {
    outline: none;

    width: 10rem;
  }
`;
