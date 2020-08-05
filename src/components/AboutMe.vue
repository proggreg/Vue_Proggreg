<template>
  <div class="primary--text">
    <!-- <h1 class="text-center">?</h1> -->
    <p>
      My name is Greg Field, I am a Software Developer at working at AuraQ in Malvern, UK.
      <br />I have completed a BSc.in Audio & Music Technology at the University of the West of England in Bristol.
      <br />I have also completed a MSc. in Computer Sceience at the University of Birmingham.
      <br />
    </p>
    <h2 class="text-center">Techical Skills</h2>

    <!-- TODO Text doesn't fit on sheet on mobile -->
    <ul class="justify-center" style="width: max-content; margin: 0 auto; list-style: none;">
      <li>
        <b>Languages:</b> Java, Javascript, Python
      </li>
      <li>
        <b>Database:</b> Postgres
      </li>
      <li style="display:flex; flex-direction: row;">
        <b>Front-end:</b>
        <ol class style="list-style: none; display: flex;">
          <li>Vue Js,</li>
          <li>HTML,</li>
          <li>CSS,</li>
          <li>SCSS</li>
        </ol>
      </li>
      <li>
        <b>Backend:</b> Express
      </li>
      <li>
        <b>Project Mangemnt:</b> GIT, Trello
      </li>
    </ul>

    <h2 class="text-center">Hobbies & Interests</h2>
    <p>
      I enjoy tech and music.
      <br />I am currently tinkering around with a Raspberry Pi and automating some of my devices using the Home Assistant OS.
    </p>
  </div>
</template>

<style lang="scss">
p {
  text-align: center;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>