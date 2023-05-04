import styled from "styled-components";

export const EntireWrapper = styled.div`
  .flex{
    display: flex;
    justify-content: center;
    padding: 30px;
    &-left{
        width: 50%;
       
    }
    &-right{
        width: 50%;
        &>div{
            font-size: 32px;
            line-height: 60px;
        }
    }
  }
`