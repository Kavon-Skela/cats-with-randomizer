<script>
  export let text = '';
  export let action = () => '';
</script>

<button class="button btn-hover color-10" type="button" on:click={action}>
  <span class="button__text">{text}</span>
</button>

<style lang="scss" scoped>
  .btn-hover {
    color: #fff;
    cursor: pointer;
    text-align:center;
    border: none;
    background-size: 300% 100%;

    border-radius: 50px;
    -o-transition: all .4s ease-in-out;
    -webkit-transition: all .4s ease-in-out;
    transition: all .4s ease-in-out;
  }

  .btn-hover:hover {
    background-position: 100% 0;
    -o-transition: all .4s ease-in-out;
    -webkit-transition: all .4s ease-in-out;
    transition: all .4s ease-in-out;
  }

  .btn-hover:focus {
    outline: none;
  }

  .btn-hover.color-10 {
    background-image: linear-gradient(to right, #ed6ea0, #ec8c69, #f7186a , #FBB03B);
    box-shadow: 0 4px 15px 0 rgba(236, 116, 149, 0.75);
  }

  .button {
    height: 50px;
    border-radius: 50px;
    width: 150px;
    transition: all .3s;

    &__text {
      font-weight: bold;
      font-size: 14px;
    }
  }
</style>