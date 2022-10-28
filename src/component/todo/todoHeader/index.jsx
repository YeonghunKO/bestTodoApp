/** @jsxImportSource @emotion/react */
import { useNavigate } from "react-router";
import storage from "../../../utils/storage";
import { todoHeaderLabelCss, todoHeaderLogoutBtnCss } from "./style";

const TodoHeader = () => {
  const navigate = useNavigate();

  return (
    <header css={todoHeaderLabelCss}>
      <label> Todo List</label>
      <button
        css={todoHeaderLogoutBtnCss}
        onClick={() => {
          storage.remove("access_token");
          navigate("/");
        }}
      >
        로그아웃
      </button>
    </header>
  );
};

export default TodoHeader;
