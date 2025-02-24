<script setup lang="ts">
import { onMounted, onActivated } from "vue";
import { useTocStore } from "~/stores/toc";

// Get the TOC store.
const tocStore = useTocStore();

// Define the manual TOC for this page.
const manualToc = [
  { id: "intro2", text: "Introductio2" },
  { id: "morphology2", text: "Morphology2" },
  { id: "ecology2", text: "Ecology2" },
  { id: "conclusion2", text: "Conclusion2" },
];

// Set the TOC when the page is first mounted.
onMounted(() => {
  tocStore.setItems(manualToc);
});

// Also set (or reset) the TOC whenever the page becomes active.
onActivated(() => {
  tocStore.setItems(manualToc);
});
</script>

<template>
  <section>
    <BaseHeading
      id="intro2"
      size="2xl"
      weight="semi-bold"
      class="mb-4 text-neutral-700"
    >
      Introduction2
    </BaseHeading>
    <p class="text-neutral-500">
      Some introductory text...Lorem ipsum dolor sit amet, consectetur
      adipiscing elit. Nulla vulputate, arcu ut porta luctus, lorem augue
      viverra nunc, at molestie tortor turpis non felis. Donec sagittis turpis
      eu imperdiet tincidunt. Etiam risus tellus, molestie id semper a, pulvinar
      eu est. Duis eu felis dui. Nunc convallis elementum maximus. Nulla et
      condimentum arcu. Maecenas lacinia imperdiet sem, sit amet venenatis
      lectus tristique vitae. Etiam pellentesque diam dolor, sit amet venenatis
      turpis gravida ut. Duis eleifend mauris id fringilla fermentum. Orci
      varius natoque penatibus et magnis dis parturient montes, nascetur
      ridiculus mus. Sed tristique dui nec dui rutrum volutpat. Aenean
      condimentum libero a facilisis molestie. Vestibulum vitae fringilla urna.
      Nam elementum purus nec nisl consectetur condimentum. Aliquam molestie
      vehicula imperdiet. Praesent vitae auctor lorem, at finibus lorem. Donec
      dapibus, nibh nec imperdiet sagittis, velit dolor tincidunt risus, id
      facilisis felis mauris at lorem. Aliquam pellentesque elementum fermentum.
      Sed pellentesque nulla ut luctus efficitur. Etiam lobortis, risus ut
      venenatis accumsan, turpis urna dignissim urna, sit amet aliquet elit nunc
      ut tortor. Phasellus felis nisl, feugiat vel ornare ut, ultrices eu lacus.
      Nulla lorem quam, venenatis a ornare id, tempor dignissim felis. Ut sed
      nibh a tortor semper vestibulum. Sed elementum pellentesque mauris, ut
      placerat eros malesuada sit amet. Nunc eget urna ac ipsum fermentum
      euismod. Vestibulum dignissim libero odio, vel imperdiet tellus feugiat
      consectetur. Vivamus commodo vestibulum vulputate. Curabitur bibendum
      augue eget justo maximus, in volutpat urna rhoncus. Sed rhoncus tortor eu
      nunc aliquam malesuada. Duis eget consectetur nunc, a ultrices velit. Nunc
      nec mi vitae metus porta mollis. Nulla lacus ex, tempus at sapien ac,
      pharetra bibendum arcu. Donec ac urna commodo, fringilla orci eget,
      ullamcorper nibh. Sed elementum risus ac justo lacinia mattis. Proin
      lectus justo, ornare vitae vestibulum a, congue vel dui. Donec quis
      venenatis felis, in ullamcorper est. Pellentesque condimentum risus vitae
      nunc eleifend, in elementum felis pellentesque. Quisque vehicula metus
      sem, quis vestibulum libero fermentum id. Nam at dignissim turpis. Ut
      luctus euismod aliquet. Pellentesque libero nisi, congue a suscipit ac,
      ullamcorper a arcu. Morbi lectus nisl, pellentesque sed elit eget, rhoncus
      hendrerit risus. Nunc eget turpis feugiat, tempor velit vel, convallis
      massa. Nullam vehicula leo vel ultricies rhoncus. Quisque et ullamcorper
      magna. Pellentesque rutrum rhoncus nulla, et dignissim leo auctor vel.
      Aenean volutpat metus porta, efficitur leo ac, vehicula nibh. Aenean porta
      odio sed condimentum condimentum. Proin at turpis id orci pulvinar
      egestas. Maecenas faucibus, quam sit amet consectetur hendrerit, odio
      ipsum pretium lacus, eu condimentum erat erat at felis. Fusce tortor arcu,
      viverra in dolor sit amet, tincidunt euismod massa. Duis ac nisi enim.
      Vestibulum vel sodales urna. Pellentesque tempor porttitor nulla, ac
      egestas risus pretium quis. Vestibulum pellentesque sem vel neque
      convallis, malesuada tempor est facilisis. Mauris interdum est nec diam
      pellentesque accumsan. Morbi sit amet nisl in turpis vestibulum tristique
      id at enim. Aliquam eu dapibus erat. Morbi metus nisi, dapibus a turpis
      non, ornare sollicitudin mauris. Proin ac sapien id dolor feugiat tempor.
      Etiam aliquet mi sed fermentum volutpat.
    </p>

    <BaseHeading id="morphology2" size="2xl" weight="semi-bold" class="mb-4">
      Morphology2
    </BaseHeading>
    <p>
      Details about morphology... Some introductory text...Lorem ipsum dolor sit
      amet, consectetur adipiscing elit. Nulla vulputate, arcu ut porta luctus,
      lorem augue viverra nunc, at molestie tortor turpis non felis. Donec
      sagittis turpis eu imperdiet tincidunt. Etiam risus tellus, molestie id
      semper a, pulvinar eu est. Duis eu felis dui. Nunc convallis elementum
      maximus. Nulla et condimentum arcu. Maecenas lacinia imperdiet sem, sit
      amet venenatis lectus tristique vitae. Etiam pellentesque diam dolor, sit
      amet venenatis turpis gravida ut. Duis eleifend mauris id fringilla
      fermentum. Orci varius natoque penatibus et magnis dis parturient montes,
      nascetur ridiculus mus. Sed tristique dui nec dui rutrum volutpat. Aenean
      condimentum libero a facilisis molestie. Vestibulum vitae fringilla urna.
      Nam elementum purus nec nisl consectetur condimentum. Aliquam molestie
      vehicula imperdiet. Praesent vitae auctor lorem, at finibus lorem. Donec
      dapibus, nibh nec imperdiet sagittis, velit dolor tincidunt risus, id
      facilisis felis mauris at lorem. Aliquam pellentesque elementum fermentum.
      Sed pellentesque nulla ut luctus efficitur. Etiam lobortis, risus ut
      venenatis accumsan, turpis urna dignissim urna, sit amet aliquet elit nunc
      ut tortor. Phasellus felis nisl, feugiat vel ornare ut, ultrices eu lacus.
      Nulla lorem quam, venenatis a ornare id, tempor dignissim felis. Ut sed
      nibh a tortor semper vestibulum. Sed elementum pellentesque mauris, ut
      placerat eros malesuada sit amet. Nunc eget urna ac ipsum fermentum
      euismod. Vestibulum dignissim libero odio, vel imperdiet tellus feugiat
      consectetur. Vivamus commodo vestibulum vulputate. Curabitur bibendum
      augue eget justo maximus, in volutpat urna rhoncus. Sed rhoncus tortor eu
      nunc aliquam malesuada. Duis eget consectetur nunc, a ultrices velit. Nunc
      nec mi vitae metus porta mollis. Nulla lacus ex, tempus at sapien ac,
      pharetra bibendum arcu. Donec ac urna commodo, fringilla orci eget,
      ullamcorper nibh. Sed elementum risus ac justo lacinia mattis. Proin
      lectus justo, ornare vitae vestibulum a, congue vel dui. Donec quis
      venenatis felis, in ullamcorper est. Pellentesque condimentum risus vitae
      nunc eleifend, in elementum felis pellentesque. Quisque vehicula metus
      sem, quis vestibulum libero fermentum id. Nam at dignissim turpis. Ut
      luctus euismod aliquet. Pellentesque libero nisi, congue a suscipit ac,
      ullamcorper a arcu. Morbi lectus nisl, pellentesque sed elit eget, rhoncus
      hendrerit risus. Nunc eget turpis feugiat, tempor velit vel, convallis
      massa. Nullam vehicula leo vel ultricies rhoncus. Quisque et ullamcorper
      magna. Pellentesque rutrum rhoncus nulla, et dignissim leo auctor vel.
      Aenean volutpat metus porta, efficitur leo ac, vehicula nibh. Aenean porta
      odio sed condimentum condimentum. Proin at turpis id orci pulvinar
      egestas. Maecenas faucibus, quam sit amet consectetur hendrerit, odio
      ipsum pretium lacus, eu condimentum erat erat at felis. Fusce tortor arcu,
      viverra in dolor sit amet, tincidunt euismod massa. Duis ac nisi enim.
      Vestibulum vel sodales urna. Pellentesque tempor porttitor nulla, ac
      egestas risus pretium quis. Vestibulum pellentesque sem vel neque
      convallis, malesuada tempor est facilisis. Mauris interdum est nec diam
      pellentesque accumsan. Morbi sit amet nisl in turpis vestibulum tristique
      id at enim. Aliquam eu dapibus erat. Morbi metus nisi, dapibus a turpis
      non, ornare sollicitudin mauris. Proin ac sapien id dolor feugiat tempor.
      Etiam aliquet mi sed fermentum volutpat.
    </p>

    <BaseHeading id="ecology2" size="2xl" weight="semi-bold" class="mb-4">
      Ecology2
    </BaseHeading>
    <p>
      Details about ecology... Some introductory text...Lorem ipsum dolor sit
      amet, consectetur adipiscing elit. Nulla vulputate, arcu ut porta luctus,
      lorem augue viverra nunc, at molestie tortor turpis non felis. Donec
      sagittis turpis eu imperdiet tincidunt. Etiam risus tellus, molestie id
      semper a, pulvinar eu est. Duis eu felis dui. Nunc convallis elementum
      maximus. Nulla et condimentum arcu. Maecenas lacinia imperdiet sem, sit
      amet venenatis lectus tristique vitae. Etiam pellentesque diam dolor, sit
      amet venenatis turpis gravida ut. Duis eleifend mauris id fringilla
      fermentum. Orci varius natoque penatibus et magnis dis parturient montes,
      nascetur ridiculus mus. Sed tristique dui nec dui rutrum volutpat. Aenean
      condimentum libero a facilisis molestie. Vestibulum vitae fringilla urna.
      Nam elementum purus nec nisl consectetur condimentum. Aliquam molestie
      vehicula imperdiet. Praesent vitae auctor lorem, at finibus lorem. Donec
      dapibus, nibh nec imperdiet sagittis, velit dolor tincidunt risus, id
      facilisis felis mauris at lorem. Aliquam pellentesque elementum fermentum.
      Sed pellentesque nulla ut luctus efficitur. Etiam lobortis, risus ut
      venenatis accumsan, turpis urna dignissim urna, sit amet aliquet elit nunc
      ut tortor. Phasellus felis nisl, feugiat vel ornare ut, ultrices eu lacus.
      Nulla lorem quam, venenatis a ornare id, tempor dignissim felis. Ut sed
      nibh a tortor semper vestibulum. Sed elementum pellentesque mauris, ut
      placerat eros malesuada sit amet. Nunc eget urna ac ipsum fermentum
      euismod. Vestibulum dignissim libero odio, vel imperdiet tellus feugiat
      consectetur. Vivamus commodo vestibulum vulputate. Curabitur bibendum
      augue eget justo maximus, in volutpat urna rhoncus. Sed rhoncus tortor eu
      nunc aliquam malesuada. Duis eget consectetur nunc, a ultrices velit. Nunc
      nec mi vitae metus porta mollis. Nulla lacus ex, tempus at sapien ac,
      pharetra bibendum arcu. Donec ac urna commodo, fringilla orci eget,
      ullamcorper nibh. Sed elementum risus ac justo lacinia mattis. Proin
      lectus justo, ornare vitae vestibulum a, congue vel dui. Donec quis
      venenatis felis, in ullamcorper est. Pellentesque condimentum risus vitae
      nunc eleifend, in elementum felis pellentesque. Quisque vehicula metus
      sem, quis vestibulum libero fermentum id. Nam at dignissim turpis. Ut
      luctus euismod aliquet. Pellentesque libero nisi, congue a suscipit ac,
      ullamcorper a arcu. Morbi lectus nisl, pellentesque sed elit eget, rhoncus
      hendrerit risus. Nunc eget turpis feugiat, tempor velit vel, convallis
      massa. Nullam vehicula leo vel ultricies rhoncus. Quisque et ullamcorper
      magna. Pellentesque rutrum rhoncus nulla, et dignissim leo auctor vel.
      Aenean volutpat metus porta, efficitur leo ac, vehicula nibh. Aenean porta
      odio sed condimentum condimentum. Proin at turpis id orci pulvinar
      egestas. Maecenas faucibus, quam sit amet consectetur hendrerit, odio
      ipsum pretium lacus, eu condimentum erat erat at felis. Fusce tortor arcu,
      viverra in dolor sit amet, tincidunt euismod massa. Duis ac nisi enim.
      Vestibulum vel sodales urna. Pellentesque tempor porttitor nulla, ac
      egestas risus pretium quis. Vestibulum pellentesque sem vel neque
      convallis, malesuada tempor est facilisis. Mauris interdum est nec diam
      pellentesque accumsan. Morbi sit amet nisl in turpis vestibulum tristique
      id at enim. Aliquam eu dapibus erat. Morbi metus nisi, dapibus a turpis
      non, ornare sollicitudin mauris. Proin ac sapien id dolor feugiat tempor.
      Etiam aliquet mi sed fermentum volutpat.
    </p>

    <BaseHeading id="conclusion2" size="2xl" weight="semi-bold" class="mb-4">
      Conclusion2
    </BaseHeading>
    <p>
      Final thoughts... Some introductory text...Lorem ipsum dolor sit amet,
      consectetur adipiscing elit. Nulla vulputate, arcu ut porta luctus, lorem
      augue viverra nunc, at molestie tortor turpis non felis. Donec sagittis
      turpis eu imperdiet tincidunt. Etiam risus tellus, molestie id semper a,
      pulvinar eu est. Duis eu felis dui. Nunc convallis elementum maximus.
      Nulla et condimentum arcu. Maecenas lacinia imperdiet sem, sit amet
      venenatis lectus tristique vitae. Etiam pellentesque diam dolor, sit amet
      venenatis turpis gravida ut. Duis eleifend mauris id fringilla fermentum.
      Orci varius natoque penatibus et magnis dis parturient montes, nascetur
      ridiculus mus. Sed tristique dui nec dui rutrum volutpat. Aenean
      condimentum libero a facilisis molestie. Vestibulum vitae fringilla urna.
      Nam elementum purus nec nisl consectetur condimentum. Aliquam molestie
      vehicula imperdiet. Praesent vitae auctor lorem, at finibus lorem. Donec
      dapibus, nibh nec imperdiet sagittis, velit dolor tincidunt risus, id
      facilisis felis mauris at lorem. Aliquam pellentesque elementum fermentum.
      Sed pellentesque nulla ut luctus efficitur. Etiam lobortis, risus ut
      venenatis accumsan, turpis urna dignissim urna, sit amet aliquet elit nunc
      ut tortor. Phasellus felis nisl, feugiat vel ornare ut, ultrices eu lacus.
      Nulla lorem quam, venenatis a ornare id, tempor dignissim felis. Ut sed
      nibh a tortor semper vestibulum. Sed elementum pellentesque mauris, ut
      placerat eros malesuada sit amet. Nunc eget urna ac ipsum fermentum
      euismod. Vestibulum dignissim libero odio, vel imperdiet tellus feugiat
      consectetur. Vivamus commodo vestibulum vulputate. Curabitur bibendum
      augue eget justo maximus, in volutpat urna rhoncus. Sed rhoncus tortor eu
      nunc aliquam malesuada. Duis eget consectetur nunc, a ultrices velit. Nunc
      nec mi vitae metus porta mollis. Nulla lacus ex, tempus at sapien ac,
      pharetra bibendum arcu. Donec ac urna commodo, fringilla orci eget,
      ullamcorper nibh. Sed elementum risus ac justo lacinia mattis. Proin
      lectus justo, ornare vitae vestibulum a, congue vel dui. Donec quis
      venenatis felis, in ullamcorper est. Pellentesque condimentum risus vitae
      nunc eleifend, in elementum felis pellentesque. Quisque vehicula metus
      sem, quis vestibulum libero fermentum id. Nam at dignissim turpis. Ut
      luctus euismod aliquet. Pellentesque libero nisi, congue a suscipit ac,
      ullamcorper a arcu. Morbi lectus nisl, pellentesque sed elit eget, rhoncus
      hendrerit risus. Nunc eget turpis feugiat, tempor velit vel, convallis
      massa. Nullam vehicula leo vel ultricies rhoncus. Quisque et ullamcorper
      magna. Pellentesque rutrum rhoncus nulla, et dignissim leo auctor vel.
      Aenean volutpat metus porta, efficitur leo ac, vehicula nibh. Aenean porta
      odio sed condimentum condimentum. Proin at turpis id orci pulvinar
      egestas. Maecenas faucibus, quam sit amet consectetur hendrerit, odio
      ipsum pretium lacus, eu condimentum erat erat at felis. Fusce tortor arcu,
      viverra in dolor sit amet, tincidunt euismod massa. Duis ac nisi enim.
      Vestibulum vel sodales urna. Pellentesque tempor porttitor nulla, ac
      egestas risus pretium quis. Vestibulum pellentesque sem vel neque
      convallis, malesuada tempor est facilisis. Mauris interdum est nec diam
      pellentesque accumsan. Morbi sit amet nisl in turpis vestibulum tristique
      id at enim. Aliquam eu dapibus erat. Morbi metus nisi, dapibus a turpis
      non, ornare sollicitudin mauris. Proin ac sapien id dolor feugiat tempor.
      Etiam aliquet mi sed fermentum volutpat.
    </p>
  </section>
</template>
