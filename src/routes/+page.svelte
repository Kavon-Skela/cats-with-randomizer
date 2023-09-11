<script>
  import mariyaT from '../assets/images/_maria_tarasiuk_1693857609619.jpeg';
  import jenya from '../assets/images/eugenia_mazalova_1693857764053.jpeg';
  import mariyaM from '../assets/images/mykhaillevska_1693857283013.jpeg';
  import natali from '../assets/images/nataliia_tarasiuk.jpeg';
  import vlada from '../assets/images/vladyslava_balan_1693857349370.jpeg';
  import lyuba from '../assets/images/lyuba.jpg';
  import valeriya from '../assets/images/photo_2023-09-11_11-43-27.jpg';
  import katya from '../assets/images/katya.jpg';
  import sasha from '../assets/images/kavon_skela_1693859447776.jpeg';
  import ilya from '../assets/images/illia_tarasiuk_1693859547118.jpeg';
  import Button from '../components/Buttons/Button.svelte';
  import { isLoggedIn, isModalDesireOpened, isModalLoginOpened, currentUser, isSuccessModalOpened } from '../stores/stores';
  import { onMount } from 'svelte';
  import LoginDesireModal from '../components/Modals/loginDesire/loginDesireModal.svelte';
  import LoginModal from '../components/Modals/login/loginModal.svelte';
  import Success from '../components/Modals/success/success.svelte';
  import angry from '../assets/sounds/angry.mp3';
  import asking from '../assets/sounds/asking.mp3';
  import confused from '../assets/sounds/confused.mp3';
  import cute from '../assets/sounds/cute.mp3';
  import angryCat from '../assets/images/cats/angry.jpg';
  import confusedCat from '../assets/images/cats/confused.jpg';
  import sleepingCat from '../assets/images/cats/sleeping.jpg';
  import cuteCat from '../assets/images/cats/cute.webp';
  import { slide } from 'svelte/transition';

  const people = [
    {
      id: 1,
      name: 'Наталі',
      photo: natali,
    },
    {
      id: 2,
      name: 'Марія-сістер',
      photo: mariyaT
    },
    {
      id: 3,
      name: 'Ілюха',
      photo: ilya
    },
    {
      id: 4,
      name: 'Марія Михайлевська',
      photo: mariyaM
    },
    {
      id: 5,
      name: 'Женьок',
      photo: jenya
    },
    {
      id: 6,
      name: 'Владка',
      photo: vlada
    },
    {
      id: 7,
      name: 'Люба',
      photo: lyuba
    },
    {
      id: 8,
      name: 'Лєрок',
      photo: valeriya
    },
    {
      id: 9,
      name: 'Катя',
      photo: katya
    },
    {
      id: 10,
      name: 'Санчо',
      photo: sasha
    }
  ];

  $: firstSelected = '';
  $: secondSelected = '';

  $: firstPerson = people.find(item => item.id === firstSelected);
  $: secondPerson = people.find(item => item.id === secondSelected);

  $: isItDarnica = false;

  const latitudeRangeKyiv = [50.3861, 50.5900];
  const longitudeRangeKyiv = [30.2399, 30.7180];

  const latitudeRangeDarnica = [50.3989, 50.4189];
  const longitudeRangeDarnica = [30.6291, 30.6585];

  const rollTheLocation = () => {
    if (isItDarnica) {
      const randomLatitude = Math.random() * (latitudeRangeDarnica[1] - latitudeRangeDarnica[0]) + latitudeRangeDarnica[0];
      const randomLongitude = Math.random() * (longitudeRangeDarnica[1] - longitudeRangeDarnica[0]) + longitudeRangeDarnica[0];
      return [randomLatitude, randomLongitude];
    }

    if (!isItDarnica) {
      const randomLatitude = Math.random() * (latitudeRangeKyiv[1] - latitudeRangeKyiv[0]) + latitudeRangeKyiv[0];
      const randomLongitude = Math.random() * (longitudeRangeKyiv[1] - longitudeRangeKyiv[0]) + longitudeRangeKyiv[0];
      return [randomLatitude, randomLongitude];
    }

  };

  const handleClick = (event) => {
    event.preventDefault();

    let randomCoords;

    if (isItDarnica) {
      randomCoords = rollTheLocation(latitudeRangeDarnica, longitudeRangeDarnica);
    } else if (!isItDarnica) {
      randomCoords = rollTheLocation(latitudeRangeKyiv, longitudeRangeKyiv);
    }

    const googleMapsLink = `https://www.google.com/maps?q=${randomCoords[0]},${randomCoords[1]}`;

    window.open(googleMapsLink, '_blank');
  };

  onMount(() => {
    if (window.localStorage.getItem('user') === 'nata') {
      $isLoggedIn = true;
      $currentUser = {
        name: window.localStorage.getItem('user'),
        photo: natali
      }
    }

    if (window.localStorage.getItem('user') === 'false') {
      $isModalDesireOpened = true;
    }
  });
</script>

<header class="header">
  <div class="header__wrapper">
    {#if !$isLoggedIn}
    <div class="buttons__wrapper">
      <Button text="Котозуватись" action={() => $isModalLoginOpened = !$isModalLoginOpened} />
    </div>
    {/if}
    {#if $isLoggedIn}
    <div class="auth_wrapper">
      <Button text="Декотозуватись" action={() => {
        $isLoggedIn = !$isLoggedIn
        $currentUser = false;
        window.localStorage.setItem('user', false)
      }}/>
  
      <div class="curr_person">
        <div class="curr_person__img_container">
          <img class="curr_person__photo" src={natali} alt="current user name">
        </div>
        <span class="curr_person__name">Наталі</span>
      </div>
    </div>
    {/if}
  </div>
</header>

<main class="main">
  <section class="select__wrapper">
    <div class="select_and_person__container">
      <label class="select__label" for="selectFirstPerson">Виберіть першого котика</label>
      <select id="selectFirstPerson" class="form-select form-select-lg" bind:value={firstSelected}>
        {#each people.filter(person => person.id !== secondSelected) as person}
          <option value={person.id}>{person.name}</option>
        {/each}
      </select>

      <div class="person__section">
        {#if firstPerson}
          <div transition:slide class="person__section__photo__wrapper">
            <img class="person__section__photo" src={firstPerson.photo} alt="">
          </div>
  
          <span transition:slide class="person__section__text">{firstPerson.name}</span>
        {/if}
      </div>
    </div>

    <div class="select_and_person__container">
      <label class="select__label" for="selectSecondPerson">Виберіть другого котика</label>
      <select id="selectSecondPerson" class="form-select form-select-lg" bind:value={secondSelected}>
        {#each people.filter(person => person.id !== firstSelected) as person}
          <option value={person.id}>{person.name}</option>
        {/each}
      </select>

      <div class="person__section">
        {#if secondPerson}
          <div transition:slide class="person__section__photo__wrapper">
            <img class="person__section__photo" src={secondPerson.photo} alt="">
          </div>
  
          <span transition:slide class="person__section__text">{secondPerson.name}</span>
        {/if}
      </div>
    </div>
  </section>

  <section class="cats__container">
    <div>
      <h5 class="cats__subtitle">Злюка</h5>
      <button class="cats__button" type="button" on:click={() => {
        document.getElementById('angry').play()
      }}>
        <div class="cats__photo_container"><img class="cats__photo" src={angryCat} alt="angry cat"></div>
        <audio id="angry" src={angry}></audio>
      </button>
    </div>

    <div>
      <h5 class="cats__subtitle">Шоооо</h5>
      <button class="cats__button" type="button" on:click={() => {
        document.getElementById('confused').play()
      }}>
        <div class="cats__photo_container"><img class="cats__photo" src={confusedCat} alt="confused cat"></div>
        <audio id="confused" src={confused}></audio>
      </button>
    </div>

    <div>
      <h5 class="cats__subtitle">Ммм?)</h5>
      <button class="cats__button" type="button" on:click={() => {
        document.getElementById('asking').play()
      }}>
        <div class="cats__photo_container"><img class="cats__photo" src={sleepingCat} alt="sleepingCat cat"></div>
        <audio id="asking" src={asking}></audio>
      </button>
    </div>

    <div>
      <h5 class="cats__subtitle">Мяу</h5>
      <button class="cats__button" type="button" on:click={() => {
        document.getElementById('cute').play()
      }}>
        <div class="cats__photo_container"><img class="cats__photo" src={cuteCat} alt="cute cat"></div>
        <audio id="cute" src={cute}></audio>
      </button>
    </div>

  </section>

  <section class="roll">
    <div class="roll__button__switcher">
      Весь Київ
      <label class="switch">
        <input type="checkbox" on:click={() => isItDarnica = !isItDarnica}>
        <span class="slider round"></span>
      </label>
      Дарниця
    </div>
    <div class="roll__button__wrapper">
      <Button text="тримай локацію" action={handleClick}/>
    </div>
    <h5 class="roll__notify">Після натискання тебе перекине на гугл карту з локацією в межах Києва <br> (а може і трохи за межами)</h5>
  </section>

  <section class="animation">
    <div id="marco">
      <div id="cielo"></div>
			<div id="luna"></div>
			<div id="gato"></div>
			<div id="muro"></div>
			<div id="edificios"></div>
    </div>
  </section>
</main>

{#if $isModalDesireOpened}
  <LoginDesireModal />
{/if}

{#if $isModalLoginOpened}
  <LoginModal />
{/if}

{#if $isSuccessModalOpened}
  <Success />
{/if}

<style lang="scss" scoped>
  @import '../assets/styles/utils/mixins';

  .header {
    gap: 30px;
    padding: 20px 10px;
    width: 100%;
    border-bottom: 1px solid rgb(167, 151, 97);

    &__wrapper {
      max-width: 1280px;
      margin: 0 auto;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-grow: 1;
    }
  }

  .curr_person {
    width: 150px;
    height: 50px;
    display: flex;
    justify-content: center;
    gap: 20px;
    align-items: center;
    background-color: rgb(255, 247, 219);
    border: 1px solid rgb(173, 173, 173);
    border-radius: 30px;

    &__img_container {
      height: 30px;
      border-radius: 30px;
      overflow: hidden;
    }

    &__photo {
      overflow: hidden;
      width: 30px;
    }
  }

  .auth_wrapper {
    display: flex;
    align-items: center;
    justify-content: start;
    gap: 30px;
  }

  .main {
    margin-top: 20px;
  }

  .person__section {
    margin-top: 20px;
    display: flex;
    gap: 20px;
    height: 300px;
    flex-direction: column;
    justify-content: center;
    align-self: center;
    padding: 0 10px;

    &__photo__wrapper {
      display: flex;
      height: 200px;
      border-radius: 30px;
      overflow: hidden;
      align-self: center;
    }

    &__photo {
      overflow: hidden;
      width: 100%;
      max-width: 200px;
      vertical-align: middle;
    }

    &__text {
      text-align: center;
      font-size: 24px;
    }
  }

  .select {
    padding: 0 10px;
    &__wrapper {
      display: flex;
      justify-content: space-around;
      max-width: 1280px;
      margin: 0 auto 40px;
        
      @include mobile {
        flex-wrap: wrap;
      }
    }
  }

  .select_and_person__container {
    display: flex;
    flex-direction: column;
    width: 300px;

    @include tablet {
      margin-bottom: 40px;
    }

    @include mobile {
      margin-bottom: 40px;
    }

    .select__label {
      margin: 0 auto 10px;
    }
  }

  .cats {
    padding: 0 10px;

    &__container {
      width: 100%;
      max-width: 1280px;
      display: flex;
      justify-content: space-between;
      gap: 40px;
      margin: 0 auto;

      @include tablet {
        flex-direction: column;
        align-items: center;
      }

      @include mobile {
        flex-direction: column;
        align-items: center;
      }
    }

    &__button {
      overflow: hidden;
      border-radius: 50%;
      border: none;
      background: none;
    }

    &__photo {
      width: 100px;
      height: 100px;
      border-radius: 50%;
    }

    &__photo_container {
      width: 100px;
      height: 100px;
    }

    &__subtitle {
      margin: 0 auto 10px;
      text-align: center;
    }
  }

  .roll {
    max-width: 1280px;
    width: 100%;
    margin: 60px auto 0;
    padding: 0 10px;

    &__button__wrapper {
      display: flex;
      justify-content: center;
      margin-bottom: 15px;
    }

    &__notify {
      text-align: center;
    }

    &__button__switcher {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 10px;
      margin-bottom: 15px;
      max-width: 1280px;
      width: 100%;

      .switch {
        position: relative;
        display: inline-block;
        width: 60px;
        height: 34px;
      }

      .switch input {
        opacity: 0;
        width: 0;
        height: 0;
      }

      .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #ccc;
        -webkit-transition: .4s;
        transition: .4s;
      }

      .slider:before {
        position: absolute;
        content: "";
        height: 26px;
        width: 26px;
        left: 4px;
        bottom: 4px;
        background-color: white;
        -webkit-transition: .4s;
        transition: .4s;
      }

      input:checked + .slider {
        background-color: #2196F3;
      }

      input:focus + .slider {
        box-shadow: 0 0 1px #2196F3;
      }

      input:checked + .slider:before {
        -webkit-transform: translateX(26px);
        -ms-transform: translateX(26px);
        transform: translateX(26px);
      }

      .slider.round {
        border-radius: 34px;
      }

      .slider.round:before {
        border-radius: 50%;
      }
    }
  }

  .animation {
    position: relative;
    max-width: 1280px;
    width: 100%;
    overflow: hidden;
    margin: 0 auto;

    #marco {
      width: 1325px;
      height: 500px;
      margin: 0 auto;
      overflow: hidden;
      margin-top: 2em;
    }

    #cielo {
      width: 1325px;
      height: 500px;
      background: linear-gradient(to bottom,  #0B4C5F 0%,#04B4AE 52%,#0c0207 100%); 
      position: absolute;
      z-index: -30;
      top: 0;
      margin-top: 2em;
    }

    #edificios {
      background: url('https://res.cloudinary.com/pastelitos/image/upload/v1610526533/eva/edificiosOne_fsg7nx.svg');
      height: 500px; 
      width: 1325px;
      z-index: -10;
      top: 6.5em;
      background-position: 0px 0px;
      background-repeat: repeat-x;
      animation: animar_edificios 120s linear infinite;
      -webkit-animation: animar_edificios 120s linear infinite;
      -ms-animation: animar_edificios 120s linear infinite;
      -moz-animation: animar_edificios 120s linear infinite;
      position: absolute;
    }

    @keyframes  animar_edificios {
      from { background-position: 0 0; }
      to { background-position: 100% 0; }
    }

    @-webkit-keyframes  animar_edificios {
      from { background-position: 0 0; }
      to { background-position: 100% 0; }
    }

    @-ms-keyframes  animar_edificios {
      from { background-position: 0 0; }
      to { background-position: 100% 0; }
    }

    @-moz-keyframes  animar_edificios {
      from { background-position: 0 0; }
      to { background-position: 100% 0; }
    }
    
    #luna {
      width: 6em;
      height: 6em;
      -moz-border-radius: 50%;
      -webkit-border-radius: 50%;
      border-radius: 50%;
      -moz-box-shadow: 30px 10px 0 #F7F8E0;
      -webkit-box-shadow: 30px 10px 0 #F7F8E0;
      box-shadow: 30px 10px 0 #F7F8E0;
      margin-top: 1em;
      margin-left: 50%;
      position: absolute;
      z-index: -19;

      @include tablet {
        margin-left: 30%;
      }

      @include mobile {
        margin-left: 10%;
      }
    }

    #muro{
      height: 23em;
      width: 100%;
      background: -moz-linear-gradient(top,  #416663 0%, #0c0207 19%); 
      background: -webkit-linear-gradient(top,  #416663 0%,#0c0207 19%); 
      background: linear-gradient(to bottom,  #416663 0%,#0c0207 19%); 
      bottom:0px; 
    }

    #gato{
      background: url('https://res.cloudinary.com/pastelitos/image/upload/v1610526571/eva/gatito_pushui.svg');
      height: 297px; 
      width: 507.5px;
      margin-top: 2em;
      margin-left: 2em;
      z-index: 10;
      -webkit-animation: sprite-animation 1.2s steps(16,end) infinite;
      -moz-animation: sprite-animation 1.2s steps(16,end) infinite; 
      -ms-animation: sprite-animation 1.2s steps(16,end) infinite; 
      animation: sprite-animation 1.2s steps(16,end) infinite;

      @include tablet {
        margin-left: 0;
      }

      @include mobile {
        margin-left: -3%;
      }

      @media (max-width: 440px) {
        margin-left: -10%;
      }
    }

    @-webkit-keyframes sprite-animation { 
      from { background-position: 0 0; }
      to { background-position: -8120px 0; } 
    }

    @-ms-keyframes sprite-animation { 
      from { background-position: 0 0; }
      to { background-position: -8120px 0; }
    }

    @-moz-keyframes sprite-animation { 
      from { background-position: 0 0; }
      to { background-position: -8120px 0; }
    }

    @keyframes sprite-animation { 
      from { background-position: 0 0; }
      to { background-position: -8120px 0; }
    }
  }
</style>