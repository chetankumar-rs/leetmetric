async function fetchUserDetails(username) {
    try {
        searchButton.textContent = "Searching...";
        searchButton.disabled = true;

        const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
        const targetUrl = 'https://leetcode.com/graphql/';

        const headers = new Headers();
        headers.append("Content-Type", "application/json");

        const graphqlQuery = JSON.stringify({
            query: `
                query userSessionProgress($username: String!) {
                    allQuestionsCount {
                        difficulty
                        count
                    }
                    matchedUser(username: $username) {
                        submitStats {
                            acSubmissionNum {
                                difficulty
                                count
                                submissions
                            }
                            totalSubmissionNum {
                                difficulty
                                count
                                submissions
                            }
                        }
                    }
                }
            `,
            variables: { username }
        });

        const response = await fetch(proxyUrl + targetUrl, {
            method: "POST",
            headers,
            body: graphqlQuery
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to fetch data: ${errorText}`);
        }

        const data = await response.json();
        if (!data?.data?.matchedUser) {
            throw new Error("User not found or incomplete data.");
        }

        displayUserData(data);
    } catch (error) {
        statsContainer.innerHTML = `<p>${error.message}</p>`;
    } finally {
        searchButton.textContent = "Search";
        searchButton.disabled = false;
    }
}

function displayUserData(parsedData) {
    try {
        const totalQues = parsedData.data.allQuestionsCount?.[0]?.count || 0;
        const totalEasyQues = parsedData.data.allQuestionsCount?.[1]?.count || 0;
        const totalMediumQues = parsedData.data.allQuestionsCount?.[2]?.count || 0;
        const totalHardQues = parsedData.data.allQuestionsCount?.[3]?.count || 0;

        const solvedTotalQues = parsedData.data.matchedUser.submitStats.acSubmissionNum?.[0]?.count || 0;
        const solvedTotalEasyQues = parsedData.data.matchedUser.submitStats.acSubmissionNum?.[1]?.count || 0;
        const solvedTotalMediumQues = parsedData.data.matchedUser.submitStats.acSubmissionNum?.[2]?.count || 0;
        const solvedTotalHardQues = parsedData.data.matchedUser.submitStats.acSubmissionNum?.[3]?.count || 0;

        updateProgress(solvedTotalEasyQues, totalEasyQues, easyLabel, easyProgressCircle);
        updateProgress(solvedTotalMediumQues, totalMediumQues, mediumLabel, mediumProgressCircle);
        updateProgress(solvedTotalHardQues, totalHardQues, hardLabel, hardProgressCircle);

        const cardsData = [
            { label: "Overall Submissions", value: solvedTotalQues },
            { label: "Overall Easy Submissions", value: solvedTotalEasyQues },
            { label: "Overall Medium Submissions", value: solvedTotalMediumQues },
            { label: "Overall Hard Submissions", value: solvedTotalHardQues },
        ];

        cardStatsContainer.innerHTML = cardsData
            .map(
                data =>
                    `<div class="card">
                        <h4>${data.label}</h4>
                        <p>${data.value}</p>
                    </div>`
            )
            .join("");
    } catch (error) {
        statsContainer.innerHTML = `<p>Failed to display data: ${error.message}</p>`;
    }
}
//the code is completed



