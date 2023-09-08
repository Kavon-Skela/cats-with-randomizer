<script>
  import { fade } from 'svelte/transition';
  import { isModalDesireOpened, isModalLoginOpened, isSuccessModalOpened } from '../../../stores/stores';
  import Button from '../../Buttons/Button.svelte';
</script>

<div class="overflow" on:click={() => $isSuccessModalOpened = !$isSuccessModalOpened} transition:fade></div>

<div class="modal" transition:fade>
  <h3>Хочете котозуватись?</h3>
  <Button text="Таааа" action={() => {
    $isModalDesireOpened = !$isModalDesireOpened;
    $isModalLoginOpened = !$isModalLoginOpened;
  }} />
  <Button text="Та ну його нахуй" action={() => {
    window.localStorage.setItem('user', 'known')
    $isModalDesireOpened = !$isModalDesireOpened
    }}/>
</div>

<style lang="scss" scoped>
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