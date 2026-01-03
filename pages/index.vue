<script lang="ts" setup>

</script>

<template>
  <div class="py-8">
    <!-- Hero Section -->
    <section class="relative overflow-hidden">
      <div class="max-w-4xl mx-auto px-6 py-20 text-center">
        <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-green-400 bg-clip-text text-transparent">
          All your coding resources, in one place
        </h1>
        <p class="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto mb-8">
          No more scattered bookmarks or forgotten tabs!
          Level up your coding journey — effortlessly save, organize, and generate resources, from tutorials and blog
          posts to AI-crafted resources tailored to your learning.
        </p>
        <UButton to="/login" size="xl">
          Get started for free
        </UButton>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-20 bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl">
      <div class="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <!-- Save Resources -->
        <div>
          <h2 class="text-3xl font-semibold mb-4 text-zinc-900 dark:text-zinc-100">
            Collect and organize effortlessly
          </h2>
          <p class="text-zinc-600 dark:text-zinc-400 mb-6">
            Keep track of every useful tutorial, video, blog post, or tool you find.
            Save them in one tidy hub that's always just a click away — way better than browser bookmarks.
          </p>
          <UButton variant="link" class="p-0 text-primary font-medium">
            Learn more →
          </UButton>
        </div>
        <div>
          <img
            src="https://images.unsplash.com/photo-1607706189992-eae578626c86?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Save Resources"
            class="rounded-2xl shadow-xl ring-1 ring-zinc-200 dark:ring-zinc-800"
          >
        </div>

        <!-- Generate Resources -->
        <div class="order-last md:order-none">
          <img
            src="https://images.unsplash.com/photo-1666890665956-ff34ea13c2cf?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Generate Resources"
            class="rounded-2xl shadow-xl ring-1 ring-zinc-200 dark:ring-zinc-800"
          >
        </div>
        <div>
          <h2 class="text-3xl font-semibold mb-4 text-zinc-900 dark:text-zinc-100">
            Generate Resources
          </h2>
          <p class="text-zinc-600 dark:text-zinc-400 mb-6">
            Struggling with a concept? Just ask. Instantly generate summaries, tutorials, or explanations tailored to your level and learning style.
          </p>
          <UButton variant="link" class="p-0 text-primary font-medium">
            Explore the generator →
          </UButton>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="bg-gradient-to-br from-green-600 to-green-700 text-white py-16 text-center my-8 rounded-2xl shadow-lg">
      <div class="max-w-4xl mx-auto px-6">
        <h2 class="text-3xl font-bold mb-4">
          Stay focused. Stay organized. Keep coding.
        </h2>
        <p class="text-lg text-green-100 mb-8">
          Your personal coding companion is here to help you learn faster and smarter. Start now — it's free.
        </p>
        <UButton
          to="/login"
          size="lg"
          color="neutral"
          variant="solid"
          class="bg-white text-green-700 hover:bg-zinc-100"
        >
          Try it now
        </UButton>
      </div>
    </section>
  </div>
</template>

<style>

</style>
