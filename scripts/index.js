// Initialize the application when DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
  console.log("🚀 Application Initialization");
  // Get the menu toggle button element
  const menuToggle = document.getElementById("menu-toggle");
  console.log("📱 Menu Toggle Element:", menuToggle);

  // Add click event listener to toggle mobile menu
  if (menuToggle) {
    menuToggle.addEventListener("click", function () {
      console.log("🔄 Menu Toggle Clicked");
      const menu = document.getElementById("mobile-menu");
      if (menu) {
        menu.classList.toggle("hidden");
        console.log(
          "📱 Mobile Menu State:",
          menu.classList.contains("hidden") ? "Hidden" : "Visible"
        );
      }
    });
  }

  // Initialize default content and load categories
  setDefaultContent();
  loadCategory();
});

/**
 * Handles user login functionality
 * Validates username and password
 * Shows appropriate alerts using SweetAlert2
 * Updates UI elements based on login status
 */
function login() {
  console.log("🔐 Login Attempt");
  // Get and trim input values
  let username = document.getElementById("username").value.trim();
  let password = document.getElementById("password").value.trim();
  console.log("👤 Username:", username);

  // Validate empty fields
  if (username === "" || password === "") {
    console.log("⚠️ Login Error: Empty Fields");
    Swal.fire({
      title: "Oops!",
      text: "Please fill in all fields.",
      icon: "warning",
      confirmButtonText: "Got it",
    });
    return;
  }
  // Validate password (hardcoded for demo)
  if (password !== "123456") {
    console.log("❌ Login Error: Invalid Password");
    Swal.fire({
      title: "Error",
      text: "Invalid password.",
      icon: "error",
      confirmButtonText: "Try Again",
    });
    return;
  }
  // Handle successful login
  console.log("✅ Login Successful");
  Swal.fire({
    title: "Welcome!",
    text: "You have successfully logged in.",
    icon: "success",
    confirmButtonText: "Continue",
  }).then(() => {
    // Update UI elements after successful login
    document.getElementById("navbar").classList.remove("hidden");
    document.getElementById("login").classList.add("hidden");
    document.getElementById("learn").classList.remove("hidden");
    document.getElementById("faq").classList.remove("hidden");
    console.log("🔄 UI Updated: Post-Login");
  });
}

/**
 * Handles user logout functionality
 * Shows confirmation dialog using SweetAlert2
 * Updates UI elements based on logout status
 */
function logout() {
  console.log("🚪 Logout Initiated");
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, log out!",
    cancelButtonText: "Cancel",
  }).then((result) => {
    if (result.isConfirmed) {
      console.log("✅ Logout Confirmed");
      // Update UI elements after successful logout
      document.getElementById("navbar").classList.add("hidden");
      document.getElementById("login").classList.remove("hidden");
      document.getElementById("learn").classList.add("hidden");
      document.getElementById("faq").classList.add("hidden");
      document.getElementById("username").value = "";
      document.getElementById("password").value = "";
      console.log("🔄 UI Updated: Post-Logout");
    } else {
      console.log("❌ Logout Cancelled");
    }
  });
}

/**
 * Scrolls to a specific section of the page
 * @param {string} sectionId - ID of the section to scroll to
 */
function scrollToSection(sectionId) {
  console.log("📜 Scrolling to section:", sectionId);
  if (sectionId === "learn" || sectionId === "faq") {
    const section = document.getElementById(sectionId);
    const sectionPosition = section.offsetTop;
    // Smooth scroll to the section
    window.scrollTo({
      top: sectionPosition,
      behavior: "smooth",
    });
    console.log("✅ Scroll completed to:", sectionId);
  }
}

/**
 * Uses Web Speech API to pronounce a word
 * @param {string} word - The word to pronounce
 */
function pronounceWord(word) {
  console.log("🔊 Pronouncing word:", word);
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN";
  window.speechSynthesis.speak(utterance);
  console.log("✅ Pronunciation completed");
}

/**
 * Sets the default content when no lesson is selected
 * Shows a message in Bengali to select a lesson
 */
const setDefaultContent = () => {
  console.log("📝 Setting default content");
  const defaultPage = document.getElementById("default");
  if (defaultPage) {
    defaultPage.innerHTML = `
    <div class="py-16 text-center bg-[#F8F8F8] rounded-3xl">
      <p class="hind-siliguri text-xs text-[#79716B]">আপনি এখনো কোন Lesson Select করেন নি|</p>
      <h3 class="hind-siliguri font-medium text-[2.12rem]">একটি Lesson Select করুন।</h3>
    </div>
    `;
    console.log("✅ Default content set");
  }
};

/**
 * Fetches all available lesson categories from the API
 * Calls showCategory to display the fetched categories
 */
const loadCategory = async () => {
  console.log("📚 Fetching categories...");
  try {
    const response = await fetch(
      "https://openapi.programming-hero.com/api/levels/all"
    );
    const data = await response.json();
    console.log("📚 Categories fetched successfully:", data);
    showCategory(data.data);
  } catch (error) {
    console.error("❌ Error fetching categories:", error);
  }
};

/**
 * Renders the lesson categories as buttons
 * @param {Array} categories - Array of category objects
 */
const showCategory = (categories) => {
  console.log("🎯 Rendering categories:", categories);
  const categoryContainer = document.getElementById("category-container");
  if (categoryContainer) {
    categoryContainer.innerHTML = "";
    // Create button for each category
    categories.forEach((element) => {
      const div = document.createElement("div");
      div.innerHTML = `
      <button onclick="loadCards('${element.level_no}')" id="btn-${element.level_no}" class="level-button btn btn-outline btn-primary group">
        <i class="fa-solid fa-book-open text-[#422AD5] group-hover:text-white"></i>
        <span class="group-hover:text-white">Lesson - ${element.level_no}</span>
      </button>
      `;
      categoryContainer.appendChild(div);
    });
    console.log("✅ Categories rendered successfully");
  }
};

/**
 * Loads vocabulary cards for a specific lesson level
 * @param {string} cardLevels - The lesson level to load cards for
 */
const loadCards = async (cardLevels) => {
  console.log("🃏 Loading cards for level:", cardLevels);
  // Remove active class from all level buttons
  document.querySelectorAll(".level-button").forEach((button) => {
    button.classList.remove("active");
  });
  // Add active class to clicked button
  const clickedButton = document.getElementById(`btn-${cardLevels}`);
  if (clickedButton) {
    clickedButton.classList.add("active");
    console.log("✅ Level button activated:", cardLevels);
  }
  // Show loading spinner
  const defaultPage = document.getElementById("default");
  const cardsContainer = document.getElementById("cardsContainer");
  if (cardsContainer) {
    cardsContainer.classList.add("hidden");
  }
  if (defaultPage) {
    defaultPage.innerHTML = `
    <div class="py-16 bg-[#F8F8F8] rounded-3xl flex justify-center items-center">
      <span class="loading loading-spinner loading-xl"></span>
    </div>
    `;
  }
  // Fetch cards data after a short delay
  setTimeout(async () => {
    try {
      const response = await fetch(
        `https://openapi.programming-hero.com/api/level/${cardLevels}`
      );
      const data = await response.json();
      console.log("🃏 Cards data fetched successfully:", data);
      if (defaultPage) {
        defaultPage.innerHTML = "";
      }
      showCards(data.data);
    } catch (error) {
      console.error("❌ Error fetching cards:", error);
    }
  }, 500);
};

/**
 * Renders vocabulary cards for the selected lesson
 * @param {Array} cards - Array of vocabulary card objects
 */
function showCards(cards) {
  console.log("🎴 Rendering cards:", cards);
  const cardsContainer = document.getElementById("cardsContainer");
  if (cardsContainer) {
    cardsContainer.innerHTML = "";
    cardsContainer.classList.remove("hidden");
    // Set up grid layout for cards
    cardsContainer.classList.add(
      "grid",
      "grid-cols-1",
      "md:grid-cols-3",
      "bg-[#F8F8F8]",
      "p-6",
      "gap-6",
      "rounded-3xl"
    );
    // Show message if no cards available
    if (cards.length === 0) {
      console.log("⚠️ No cards available for this level");
      cardsContainer.innerHTML = `
      <div class="py-16 text-center bg-[#F8F8F8] rounded-3xl col-span-full flex flex-col items-center justify-center">
        <img src="assets/alert-error.png" alt="" class="mb-4">
        <p class="hind-siliguri text-xs text-[#79716B] pb-4">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
        <h3 class="hind-siliguri font-medium text-[2.12rem]">নেক্সট Lesson এ যান।</h3>
      </div>
      `;
      return;
    }
    // Create card for each vocabulary word
    cards.forEach((card) => {
      const div = document.createElement("div");
      div.innerHTML = `
      <div class="card card-md bg-white text-center">
        <div class="card-body hover:bg-slate-50 p-14">
          <h2 class="font-bold text-2xl inter">${card.word}</h2>
          <p class="py-3 inter font-medium text-lg">Meaning / Pronunciation</p>
          <h2 class="hind-siliguri font-semibold text-xl opacity-80">"${
            card.meaning || "Information not available"
          } / ${card.pronunciation}"</h2>
          <div class="flex justify-between pt-5">
            <button onclick="showWordDetails(${
              card.id
            })" class="btn bg-[#1A91FF10] border-none">
            <i class="fa-solid fa-circle-info"></i></button>
            <button onclick="pronounceWord('${
              card.word
            }')" class="btn bg-[#1A91FF10] border-none" ${card.word}>
            <i class="fa-solid fa-volume-high"></i></button>
          </div>
        </div>
      </div>
      `;
      cardsContainer.appendChild(div);
    });
    console.log("✅ Cards rendered successfully");
  }
}

/**
 * Fetches and displays detailed information about a word in a modal
 * @param {number} wordId - ID of the word to fetch details for
 */
const showWordDetails = async (wordId) => {
  console.log("📖 Fetching details for word ID:", wordId);
  try {
    const response = await fetch(
      `https://openapi.programming-hero.com/api/word/${wordId}`
    );
    const data = await response.json();
    console.log("📖 Word details fetched successfully:", data);
    const wordDetails = data.data;
    // Get modal elements
    const modal = document.getElementById("word-details-modal");
    const modalContent = document.getElementById("modal-content");
    // Populate modal with word details
    modalContent.innerHTML = `
    <div class="space-y-4 border-2 border-[#1A91FF10] p-4 rounded-lg">
      <h2 class="text-3xl font-bold mb-4">${
        wordDetails.word
      }(<i class="fa-solid fa-microphone-lines"></i> :<span class="hind-siliguri">${
      wordDetails.pronunciation
    }</span>)</h2>
      ${
        wordDetails?.meaning
          ? `
      <div>
        <h3 class="font-semibold text-lg mb-2">Meaning</h3>
        <p class="text-lg hind-siliguri">${wordDetails.meaning}</p>
      </div>
      `
          : `
      <div>
        <h3 class="font-semibold text-lg mb-2">Meaning</h3>
        <p class="text-lg hind-siliguri text-blue-600">Information not available</p>
      </div>
      `
      }
      <h3 class="font-semibold text-lg mb-2">Example</h3>
        <p class="text-lg hind-siliguri">${wordDetails.sentence}</p>
        <h3 class="font-semibold text-lg mb-2 hind-siliguri">সমার্থক শব্দ গুলো</h3>
        <div class="flex flex-wrap gap-2">
          ${wordDetails.synonyms
            .map(
              (synonym) => `
            <span class="btn bg-[#1A91FF10]">${synonym}</span>
          `
            )
            .join("")}
        </div>
    </div>
    `;
    modal.showModal();
    console.log("✅ Word details modal displayed");
  } catch (error) {
    console.error("❌ Error fetching word details:", error);
  }
};

/**
 * Closes the word details modal
 */
const closeModal = () => {
  console.log("🔴 Closing modal");
  const modal = document.getElementById("word-details-modal");
  modal.close();
  console.log("✅ Modal closed");
};
