<script>
  import { isModalLoginOpened, isSuccessModalOpened, currentUser, isLoggedIn } from '../../../stores/stores';
  import photo from '../../../assets/images/nataliia_tarasiuk.jpeg';
  import Button from '../../Buttons/Button.svelte';
  import { fade } from 'svelte/transition';
  import { afterUpdate } from 'svelte';

  $: password = '';
  $: isPassError = false;

  afterUpdate(() => {
    setTimeout(() => {
      isPassError = false;
    }, 3000);
  })
</script>

<div class="overflow" on:click={() => $isModalLoginOpened = !$isModalLoginOpened} transition:fade></div>
<div class="modal" transition:fade>
  <h3 class="modal_header">Підтвердіть, шо ви котик)</h3>
  <div class="modal_wrapper">
    {#if isPassError}
      <span class="modal_error" transition:fade>От дідько, не той пароль(</span>
    {/if}
    <input class="modal_input" type="password" bind:value={password} on:input={() => isPassError = false}>
  </div>
  <div class="modal_buttons">
    <Button text="та шось нє" action={() => $isModalLoginOpened = !$isModalLoginOpened} />
      <Button text="тиць" action={() => {
        if (password !== '1611') {
          isPassError = true;
          return;
        }

        if (password === '1611') {
          $isSuccessModalOpened = true;
          $isModalLoginOpened = false;
          $currentUser = {
            name: 'Наталі',
            photo
          }
          $isLoggedIn = true;
          window.localStorage.setItem('user', 'nata');
        }
      }}/>
  </div>
</div>

<style lang="scss" scoped>
  @import '../../../assets/styles/utils/mixins';

  .modal {
    position: fixed;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 30px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80%;
    max-width: 500px;
    min-height: 300px;
    height: max-content;
    background-color: rgb(255, 251, 235);
    border-radius: 30px;
    padding: 20px;
    border: 1px solid black;
    z-index: 3;

    &_header {
      text-align: center;
      margin-bottom: 20px;
    }

    &_wrapper {
      position: relative;
    }

    &_input {
      height: 40px;
      width: 100%;
      max-width: 400px;
      font-size: 20px;
      border-radius: 10px;
      padding-left: 15px;
    }

    &_error {
      position: absolute;
      top: -100%;
      left: 10%;
      color: red;
    }

    &_buttons {
      display: flex;
      gap: 20px;

      @include mobile {
        flex-wrap: wrap;
        justify-content: center;
      }

      @include tablet {
        flex-wrap: wrap;
        justify-content: center;
      }
    }
  }

  .overflow {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: black;
    opacity: 0.7;
    z-index: 2;
  }
</style>