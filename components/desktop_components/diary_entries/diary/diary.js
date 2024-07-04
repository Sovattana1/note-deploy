// DiaryManager class manages diary entries and interactions
class DiaryManager {
    constructor() {
        // Initialize DOM elements and event listeners
        this.diaryEntryWrapper = document.querySelector('.diary-entries-grid-wrapper');
        this.diaryContainer = document.createElement("div");
        this.diaryContainer.classList.add('diary-entries-grid');
        this.diaryEntryWrapper.appendChild(this.diaryContainer);

        // Event listener for adding a new diary entry
        this.diaryAddButton = document.querySelector('#add-btn');
        this.diaryAddButton.addEventListener("click", this.addDiaryEntry.bind(this));

        // Event listener for handling key events in the diary container
        this.diaryContainer.addEventListener('keydown', this.handleEnterKey.bind(this));

        // Event listener for adding a new diary entry on mobile
        this.addBtnDiaryMobile = document.querySelector(".add-diary-mobile");
        this.addBtnDiaryMobile.addEventListener("click", () => {
            const newDiaryEntry = this.addDiaryEntry(); // Capture the new diary entry
            this.showWhenClickOnPlus(newDiaryEntry); // Show edit modal for the new entry
        });

        this.showNotes(); // Initialize diary entries from localStorage on page load
    }

    // Load existing diary entries from localStorage
    showNotes() {
        const storedNotes = localStorage.getItem("notes");
        if (storedNotes) {
            this.diaryContainer.innerHTML = storedNotes;
            this.addEventListenersToDiaryEntries(); // Add event listeners to existing diary entries
        }
    }

    // Update localStorage with current diary entries
    updateStorage() {
        localStorage.setItem("notes", this.diaryContainer.innerHTML);
    }

    // Add a new diary entry to the UI and initialize event listeners
    addDiaryEntry() {
        let newDiaryEntry = document.createElement("div"); //create new div element 
        newDiaryEntry.classList.add('diary-container'); // add class to the element
        newDiaryEntry.innerHTML = `
            <div class="diary-header">
                <p contenteditable="false" class="title-desktop" id="title-desktop-diary">Title</p>
                <p contenteditable="false" class="date-grit-desktop" id="date-desktop-diary">dd/mm/yyyy</p>
            </div>
            <p contenteditable="false" class="display-diary">
                <div class="diary-icon">
                    <img src="./public/diary_icon/bin.png" draggable="false" class="delete-btn">
                    <img src="./public/diary_icon/edit-246-32.png" draggable="false" class="edit-btn">
                </div>
            </p>
        `;
        this.diaryContainer.appendChild(newDiaryEntry); //appendChild (new diary) to the diaryContainer

        // Event listener for opening edit modal on diary container click
        newDiaryEntry.addEventListener("click", (e) => {
            if (e.target.classList.contains('delete-btn') || e.target.classList.contains('edit-btn')) {
                return; // Do nothing if delete or edit button is clicked
            }
            const openModalDiary = new EditDiaryPopup(newDiaryEntry, this);
            openModalDiary.openModal();
        });

        // Initialize the edit popup for the new diary entry
        const editButton = newDiaryEntry.querySelector('.edit-btn'); //select edit button from newDiaryEntry in the same function
        editButton.addEventListener("click", (e) => {
            e.stopPropagation(); // Prevent triggering the parent click event
            const modal = new EditDiaryPopup(newDiaryEntry, this); //call class when edit button is clicked
            modal.openModal(); //open diary modal
        });

        // Event listener for deleting the diary entry
        const deleteBtn = newDiaryEntry.querySelector('.delete-btn'); //select delete button from newDiaryEntry in the same function
        deleteBtn.addEventListener("click", (e) => {
            e.stopPropagation(); // Prevent triggering the parent click event
            this.removeDiaryEntryWithAnimation(newDiaryEntry); //remove diary entry from the UI with animation
        });

        // Event listener for updating storage when content is edited
        newDiaryEntry.addEventListener("input", () => {
            this.updateStorage();
        });

        this.updateStorage(); // Save the new entry to localStorage
        return newDiaryEntry; // Return the new diary entry DOM element
    }

    // Remove diary entry with animation
    removeDiaryEntryWithAnimation(diaryEntry) {
        diaryEntry.classList.add('removing'); // Add class to trigger CSS transition
        diaryEntry.addEventListener('transitionend', () => {
            diaryEntry.remove(); // Remove the diary entry from the DOM after animation ends
            this.updateStorage(); // Update localStorage after removal
        });
    }

    // Show edit modal when clicking on the plus button (mobile)
    showWhenClickOnPlus(newDiaryEntry) {
        const modal = new EditDiaryPopup(newDiaryEntry, this);
        modal.openModal();
    }

    // Add event listeners to existing diary entries for edit and delete buttons
    addEventListenersToDiaryEntries() {
        // Event listener for edit button on existing diary entries
        const editButtons = this.diaryContainer.querySelectorAll('.edit-btn'); //select element from diary container
        editButtons.forEach(editButton => { //work on every existed diary
            editButton.addEventListener("click", (e) => {
                e.stopPropagation(); // Prevent triggering the parent click event
                const diaryEntry = editButton.closest('.diary-container'); //select the closest diary element
                const modal = new EditDiaryPopup(diaryEntry, this); //call EditDiary class for funtionality
                modal.openModal(); //open edit modal
            });
        });

        // Event listener for delete button on existing diary entries
        const deleteButtons = this.diaryContainer.querySelectorAll('.delete-btn');
        deleteButtons.forEach(deleteBtn => {
            deleteBtn.addEventListener("click", (e) => {
                e.stopPropagation(); // Prevent triggering the parent click event
                const diaryEntry = deleteBtn.closest('.diary-container');
                this.removeDiaryEntryWithAnimation(diaryEntry); //remove diary entry from the UI with animation
            });
        });

        // Event listener for opening edit modal on diary container click
        const diaryContainers = this.diaryContainer.querySelectorAll('.diary-container');
        diaryContainers.forEach(diaryContainer => {
            diaryContainer.addEventListener("click", (e) => {
                if (e.target.classList.contains('delete-btn') || e.target.classList.contains('edit-btn')) {
                    return; // Do nothing if delete or edit button is clicked
                }
                const openModalDiary = new EditDiaryPopup(diaryContainer, this);
                openModalDiary.openModal();
            });
        });
    }

    // Handle Enter key press to insert line break
    handleEnterKey(event) {
        if (event.key === "Enter") {
            document.execCommand("insertLineBreak");
            event.preventDefault();
        }
    }
}

// EditDiaryPopup class manages the edit modal for diary entries
class EditDiaryPopup {
    constructor(diaryEntry, diaryManager) {
        this.diaryEntry = diaryEntry; // Current diary entry being edited
        this.diaryManager = diaryManager; // Reference to DiaryManager for updating storage
    }

    // Open edit modal and populate with current diary entry content
    openModal() {
        const modalOverlay = document.createElement("div");
        modalOverlay.classList.add("edit-modal-overlay");
        document.body.appendChild(modalOverlay);

        const modalContainer = document.createElement("div");
        modalContainer.classList.add("edit-modal-container");
        modalOverlay.appendChild(modalContainer);

        const modalGridContainer = document.createElement("div");
        modalGridContainer.classList.add("grid-overlay");
        modalContainer.appendChild(modalGridContainer);

        // Populate modal with current diary entry content
        modalGridContainer.innerHTML = `
            <div class="diary-header-modal">
                <div class="header-modal-background">
                    <div class="left-side-of-header">
                        <p contenteditable="true" class="title-desktop" id="title-desktop-diary-modal">Title</p>
                        <div class="date-time">
                            <p id="date">Date: </p>
                            <input type="date" id="date-desktop-diary-modal" class="date-grit-desktop">
                        </div>
                    </div>
                    <div class="submit-done">Done</div>
                </div>
            </div>
            <p contenteditable="true" class="display-diary-modal"></p>
        `;

        // Fill modal fields with current diary entry data
        const title = this.diaryEntry.querySelector(".title-desktop").textContent.trim();
        const date = this.diaryEntry.querySelector(".date-grit-desktop").textContent.trim();
        const content = this.diaryEntry.querySelector(".display-diary").textContent.trim();
        modalContainer.querySelector(".title-desktop").textContent = title;
        modalContainer.querySelector(".date-grit-desktop").value = this.formatDateForInput(new Date(date));
        modalContainer.querySelector(".display-diary-modal").textContent = content;

        // Event listener for 'Done' button to save changes
        const submitButton = modalContainer.querySelector(".submit-done");
        submitButton.addEventListener("click", this.saveContent.bind(this));

        // Event listener for handling Enter key in content area
        document.addEventListener('keydown', this.handleEnterKey.bind(this));
    }

    // Format date to 'yyyy-mm-dd' for input[type="date"]
    formatDateForInput(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    // Save edited content and update diary entry and localStorage
    saveContent() {
        const titleModal = document.querySelector("#title-desktop-diary-modal").textContent;
        const dateModal = document.querySelector("#date-desktop-diary-modal").value;
        const contentModal = document.querySelector(".display-diary-modal").textContent;

        // Convert date from 'yyyy-mm-dd' to 'dd/mm/yyyy'
        const [year, month, day] = dateModal.split('-');
        const formattedDate = `${day}/${month}/${year}`;

        // Update diary entry with edited content
        this.diaryEntry.querySelector(".title-desktop").textContent = titleModal;
        this.diaryEntry.querySelector(".date-grit-desktop").textContent = formattedDate;
        this.diaryEntry.querySelector(".display-diary").textContent = contentModal;

        // Update localStorage and close modal
        this.diaryManager.updateStorage();

        // Remove the edit modal from the DOM
        const modalOverlay = document.querySelector(".edit-modal-overlay");
        modalOverlay.remove();
    }

    // Handle Enter key press in content area to insert line break
    handleEnterKey(event) {
        if (event.key === "Enter") {
            const activeElement = document.activeElement;
            if (activeElement.classList.contains('display-diary-modal')) {
                const selection = window.getSelection();
                const range = selection.getRangeAt(0);
                const br = document.createElement('br');
                range.deleteContents();
                range.insertNode(br);
                range.setStartAfter(br);
                range.setEndAfter(br);
                selection.removeAllRanges();
                selection.addRange(range);
                event.preventDefault();
            }
        }
    }
}

// Initialize diary entry functionality when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    new DiaryManager();
});

// Exported function placeholder for future enhancements or extensions
export default function createEditDiaryPopup() {};
