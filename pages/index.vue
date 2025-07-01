<script lang="ts" setup>

</script>

<template>
  <div>
    <section>
      <div class="max-w-7xl px-6 py-20 text-center">
        <h1 class="text-4xl sm:text-5xl font-bold mb-6">
          Your Smart Resource Hub
        </h1>
        <p class="text-lg my-4">
          Level up your coding journey — effortlessly save, organize, and generate resources, from tutorials and blog
          posts to AI-crafted insights tailored to your learning.
        </p>
        <UButton to="/" size="xl" class="mb-4">
          Get Started
        </UButton>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-20 bg-elevated rounded-md">
      <div class="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <!-- Save Resources -->
        <div>
          <h2 class="text-3xl font-semibold mb-4">
            📁 Save Resources
          </h2>
          <p class="mb-6">
            Organize your learning journey. Save links to your favorite tutorials, videos, blog posts, and more — all in
            one accessible place. No more lost tabs or forgotten bookmarks.
          </p>
          <a href="#" class="text-primary font-medium hover:underline">Learn more →</a>
        </div>
        <div>
          <img
            src="https://images.unsplash.com/photo-1607706189992-eae578626c86?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Save Resources" class="rounded-xl shadow-lg"
          >
        </div>

        <!-- Generate Resources -->
        <div class="order-last md:order-none">
          <img
            src="https://images.unsplash.com/photo-1666890665956-ff34ea13c2cf?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Generate Resources" class="rounded-xl shadow-lg"
          >
        </div>
        <div>
          <h2 class="text-3xl font-semibold mb-4">
            🧠 Generate Resources
          </h2>
          <p class="mb-6">
            Need a quick summary, tutorial, or blog post? Input your topic and preferred format — our AI will generate
            high-quality, custom content to fit your style and purpose.
          </p>
          <a href="#" class="text-primary font-medium hover:underline">Explore the generator →</a>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="bg-green-700 text-white py-16 text-center my-4 rounded-md">
      <div class="max-w-4xl mx-auto px-6">
        <h2 class="text-3xl font-bold mb-4">
          Ready to streamline your content flow?
        </h2>
        <p class="text-lg mb-6">
          Start saving and generating with ease. Your all-in-one resource tool is just a click away.
        </p>
        <a
          href="#"
          class="inline-block bg-white text-blue-600 px-6 py-3 rounded-xl text-lg font-semibold hover:bg-gray-100 transition"
        >
          Try it now
        </a>
      </div>
    </section>
  </div>
</template>

<style>

</style>
