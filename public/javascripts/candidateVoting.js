const candidates = document.getElementsByClassName("nameOfTheCandidate");

function voteYourCandidate() {
    for (let i = 0; i < candidates.length; ++i) {
        if (candidates[i].checked) {
            document.getElementById("voteButton").removeAttribute("disabled");
        }
    }
}