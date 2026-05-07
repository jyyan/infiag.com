<script setup lang="ts">
import { ref } from 'vue'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'

const props = defineProps<{
  variant?: 'compact' | 'full'
  eyebrow: string
  name: string
  title: string
  roleExtended?: string
  headline: string
  quotes: string[]
  expandLabel: string
  videoLabel: string
  fullSpeech: string
  videoHref: string
  photoSrc?: string
}>()

const open = ref(false)
const isFull = props.variant === 'full'
</script>

<template>
  <section class="py-12 lg:py-16">
    <div class="container-tight max-w-5xl">
      <p class="font-mono text-xs uppercase tracking-[0.25em] text-lumi-pink text-center mb-6">
        — {{ eyebrow }} —
      </p>

      <FadeInUp :delay="0">
        <div class="glass-card p-6 lg:p-10 grid grid-cols-1 md:grid-cols-[180px_1fr] gap-6 lg:gap-10 items-start">
          <!-- Photo slot -->
          <div class="mx-auto md:mx-0">
            <div
              class="w-32 h-32 md:w-40 md:h-40 lg:w-44 lg:h-44 rounded-2xl overflow-hidden border-2 border-lumi-purple/40 shadow-lumi-glow flex items-center justify-center"
              :style="!photoSrc ? 'background: linear-gradient(135deg, hsl(var(--lumi-purple) / 0.45), hsl(var(--lumi-pink) / 0.45));' : ''"
            >
              <img v-if="photoSrc" :src="photoSrc" :alt="name" class="w-full h-full object-cover" />
              <span v-else class="text-5xl lg:text-6xl font-display font-bold text-white">林</span>
            </div>
          </div>

          <!-- Content -->
          <div class="space-y-4">
            <div>
              <h3 class="text-2xl lg:text-3xl font-display font-bold text-fg-primary mb-1">
                {{ name }} <span class="text-lumi-gradient">{{ headline }}</span>
              </h3>
              <p class="text-fg-secondary text-sm md:text-base">{{ title }}</p>
              <p v-if="isFull && roleExtended" class="text-fg-secondary text-sm leading-relaxed mt-3">{{ roleExtended }}</p>
            </div>

            <!-- Compact: 3 quotes + expand button -->
            <template v-if="!isFull">
              <ul class="space-y-2 border-l-2 border-lumi-pink/40 pl-4">
                <li v-for="q in quotes" :key="q" class="text-fg-primary italic text-base leading-relaxed">
                  「{{ q }}」
                </li>
              </ul>

              <div class="flex flex-col sm:flex-row gap-3 pt-2">
                <Dialog v-model:open="open">
                  <DialogTrigger as-child>
                    <button class="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full border border-lumi-purple/50 text-lumi-pink hover:bg-lumi-purple/10 transition-colors text-sm font-medium">
                      {{ expandLabel }}
                      <Icon name="lucide:book-open" class="w-4 h-4" />
                    </button>
                  </DialogTrigger>
                  <DialogContent class="max-w-2xl max-h-[85vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle class="text-xl font-display">
                        {{ name }} · {{ headline }}
                      </DialogTitle>
                    </DialogHeader>
                    <div class="prose prose-invert max-w-none whitespace-pre-line text-fg-primary leading-relaxed pt-2">
                      {{ fullSpeech }}
                    </div>
                  </DialogContent>
                </Dialog>

                <a
                  :href="videoHref"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-lumi-purple/15 border border-lumi-purple/60 text-lumi-pink hover:bg-lumi-purple/25 transition-colors text-sm font-medium"
                >
                  {{ videoLabel }}
                  <Icon name="lucide:external-link" class="w-4 h-4" />
                </a>
              </div>
            </template>

            <!-- Full: inline full speech + video button -->
            <template v-else>
              <div class="pt-4 border-t border-lumi-purple/20">
                <p class="font-mono text-xs uppercase tracking-[0.2em] text-lumi-pink mb-4">— {{ headline }} —</p>
                <div class="whitespace-pre-line text-fg-primary leading-loose text-base">{{ fullSpeech }}</div>
              </div>
              <div class="pt-4">
                <a
                  :href="videoHref"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-lumi-purple/15 border border-lumi-purple/60 text-lumi-pink hover:bg-lumi-purple/25 transition-colors text-sm font-medium"
                >
                  {{ videoLabel }}
                  <Icon name="lucide:external-link" class="w-4 h-4" />
                </a>
              </div>
            </template>
          </div>
        </div>
      </FadeInUp>
    </div>
  </section>
</template>
