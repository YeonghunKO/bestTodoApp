/** @jsxImportSource @emotion/react */
import { useNavigate } from "react-router";
import { todoHeaderLabelCss, todoHeaderLogoutBtnCss } from "./style";

const TodoHeader = () => {
  const navigate = useNavigate();

  return (
    <header css={todoHeaderLabelCss}>
      <label> Todo List</label>
      <button
        css={todoHeaderLogoutBtnCss}
        onClick={() => {
          localStorage.removeItem("access_token");
          navigate("/");
        }}
      >
        로그아웃
      </button>
    </header>
  );
};

export default TodoHeader;
