/** @jsxImportSource @emotion/react */
import { useNavigate } from "react-router";

import { TOKEN_STORAGE_KEY } from "../../../constants/storage";
import { removeItem } from "../../../utils/storage";

import { todoHeaderLabelCss, todoHeaderLogoutBtnCss } from "./style";

const TodoHeader = () => {
  const navigate = useNavigate();

  return (
    <header css={todoHeaderLabelCss}>
      <label> Todo List</label>
      <button
        css={todoHeaderLogoutBtnCss}
        onClick={() => {
          removeItem(TOKEN_STORAGE_KEY);

          navigate("/");
        }}
      >
        로그아웃
      </button>
    </header>
  );
};

export default TodoHeader;
