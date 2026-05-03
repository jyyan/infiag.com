<script setup lang="ts">
interface Props {
  src: string
  title: string
  caption?: string
  posterTime?: string
}
const props = withDefaults(defineProps<Props>(), { posterTime: '0.5' })

const videoEl = ref<HTMLVideoElement | null>(null)
const playing = ref(false)

const sourceWithPoster = computed(() => `${props.src}#t=${props.posterTime}`)

function play() {
  const v = videoEl.value
  if (!v) return
  v.controls = true
  v.play()
  playing.value = true
}
</script>

<template>
  <figure class="glass-card overflow-hidden group">
    <div class="relative aspect-video bg-bg-deep">
      <video
        ref="videoEl"
        :src="sourceWithPoster"
        preload="metadata"
        playsinline
        class="w-full h-full object-cover"
      />
      <button
        v-if="!playing"
        type="button"
        class="absolute inset-0 flex items-center justify-center bg-bg-deep/40 hover:bg-bg-deep/20 transition-colors"
        :aria-label="`Play ${title}`"
        @click="play"
      >
        <span class="w-20 h-20 rounded-full bg-accent-bright/90 backdrop-blur-sm flex items-center justify-center shadow-glow-lg group-hover:scale-110 transition-transform">
          <Icon name="lucide:play" class="w-8 h-8 text-bg-deep ml-1" />
        </span>
      </button>
    </div>
    <figcaption v-if="title || caption" class="p-5 space-y-1 border-t border-border-subtle">
      <div class="font-display font-bold text-fg-primary">{{ title }}</div>
      <p v-if="caption" class="text-sm text-fg-secondary leading-relaxed">{{ caption }}</p>
    </figcaption>
  </figure>
</template>
