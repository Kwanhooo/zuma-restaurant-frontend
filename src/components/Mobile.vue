<template>
  <nav>
    <a class="active" href="#">
      <svg viewBox="0 0 100 100">
        <g transform="translate(10 5) scale(0.8 0.9)">
          <path d="M 0 30 v 70 h 100 v -70 l -50 -30 z" stroke="currentColor" stroke-width="10" fill="none"
                stroke-linejoin="round" stroke-linecap="round"/>
        </g>
      </svg>
      <span>
      Home
    </span>
    </a>

    <a href="#">
      <svg viewBox="0 0 100 100">
        <g transform="translate(5 5) scale(0.9 0.9)">
          <path d="M 50 35 a 20 20 0 0 1 50 0 q 0 25 -50 60 q -50 -35 -50 -60 a 25 25 0 0 1 50 0" stroke="currentColor"
                stroke-width="10" fill="none" stroke-linejoin="round" stroke-linecap="round"/>
        </g>
      </svg>
      <span>
      Likes
    </span>
    </a>

    <a href="#">
      <svg viewBox="0 0 100 100">
        <g transform="translate(5 5) scale(0.9 0.9)">
          <circle cx="45" cy="38" r="38" stroke="currentColor" stroke-width="10" fill="none"/>
          <line x1="66" y1="65" x2="100" y2="100" stroke="currentColor" stroke-width="10"/>
        </g>
      </svg>
      <span>
      Search
    </span>
    </a>

    <a href="#">
      <svg viewBox="0 0 100 100">
        <g transform="translate(5 5) scale(0.9 0.9)">
          <circle cx="50" cy="35" r="18" stroke="currentColor" stroke-width="10" fill="none"/>
          <rect x="15" y="75" width="70" height="50" rx="25" stroke="currentColor" stroke-width="10" fill="none"/>
        </g>
      </svg>
      <span>
      Profile
    </span>
    </a>
  </nav>
</template>

<script>
window.onload = function () {
  const navigationOptions = [
    {
      name: 'home',
      color: '#5B37B7'
    },
    {
      name: 'likes',
      color: '#C9379D'
    },
    {
      name: 'search',
      color: '#E6A919'
    },
    {
      name: 'profile',
      color: '#1892A6'
    }
  ];

  const links = document.querySelectorAll('nav a');

  function handleClick(e) {
    e.preventDefault();
    links.forEach(link => {
      if (link.classList.contains('active')) {
        link.classList.remove('active');
      }
    });

    const name = this.textContent.trim().toLowerCase();
    const {color} = navigationOptions.find(item => item.name === name);

    const style = window.getComputedStyle(this);
    const hoverColor = style.getPropertyValue('--hover-c');
    if (color !== hoverColor) {
      this.style.setProperty('--hover-bg', `${color}20`);
      this.style.setProperty('--hover-c', color);
    }
    this.classList.add('active');
    document.querySelector('body').style.background = color;
  }

  links.forEach(link => link.addEventListener('click', handleClick));
};

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Mobile",
}
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Open+Sans:700");

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  background: #5b37b7;
  color: #010101;

  min-height: 100vh;
  display: grid;
  place-items: center;
  font-family: "Open Sans", sans-serif;

  transition: background 0.2s ease-out;
}


nav {
  display: flex;
  background: #fff;

  padding: 2rem 3.15rem;
  border-radius: 0 0 30px 30px;
  box-shadow: 0 1px 15px rgba(0, 0, 0, 0.1);
}


a {
  color: inherit;
  text-decoration: none;
  margin: 0 0.2rem;

  display: flex;
  align-items: center;

  padding: 0.75rem 1.25rem;
  border-radius: 30px;

  position: relative;

  --hover-bg: #5b37b720;
  --hover-c: #5b37b7;
}

a svg {
  margin-right: -2.5rem;
  width: 28px;
  height: 28px;
  pointer-events: none;

  transition: margin 0.2s ease-out;
}

a span {
  opacity: 0;
  visibility: hidden;
  font-size: 0.9rem;
  margin-left: 0.9rem;
}

a:before {
  position: absolute;
  content: "";
  top: 50%;
  left: 0;
  width: 70px;
  height: 70px;
  border-radius: 50%;

  transform: translate(0%, -50%) scale(0);
  visibility: visible;
  opacity: 1;
}

a.active {
  background: var(--hover-bg);
  color: var(--hover-c);
}

a.active:before {
  background: var(--hover-c);
  opacity: 0;
  visibility: hidden;
  transform: translate(0%, -50%) scale(2);

  transition: all 0.4s ease-out;
}

a.active svg {
  margin-right: 0;
}

a.active span {
  visibility: visible;
  opacity: 1;
  transition: all 0.2s ease-out;
}


@media (max-width: 500px) {
  nav {
    flex-direction: column;
    justify-self: start;
    border-radius: 0 30px 30px 0;
    padding: 2rem 1.15rem 2rem 0.75rem;
  }

  nav a {
    margin: 0.5rem 0;
  }

  nav svg {
    margin: 0;
  }
}
</style>