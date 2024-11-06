const express = require('express'); 
const axios = require('axios');
const data = require('./dating_data.json');
const app = express();
const port = 3000;
const apiKey = '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'; 
const model = 'sentence-transformers/all-MiniLM-L6-v2';
// const model = 'meta-llama/Llama-2-13b-hf';
const usersData = data.responses.map((field,index) => {
    return {
        id: index,
        description: `${field.interest} ${field.currentLocation.city} ${field.currentLocation.country} ${field.zodiacSign} ${field.languagesSpoken}`
    };
});

async function getEmbeddings(sentence) {
    try {
        const response = await axios.post(
            `https://api-inference.huggingface.co/models/${model}`,
            { 
                inputs: {
                    "source_sentence": sentence,
                    "sentences": usersData.map(user => user.description), // Use descriptions of users
                }

            },
            { headers: { Authorization: `Bearer ${apiKey}` } }
        );

        console.log('Full response from Hugging Face API:', response.data);
        
        return response.data; 

    } catch (error) {
        console.error('Error message:', error.message);
        if (error.response) {
            console.error('Status code:', error.response.status);
            console.error('Response data:', error.response.data);
        } else {
            console.error('No response received:', error.message);
        }
        throw new Error('Error fetching embeddings');
    }
}

// async function dataFromMongodb()
// {
//     const result = await axios.get('https://dating-backend-beta.vercel.app/user-profile/get-responses/6704fe3c570c3657b78695e8');
//     console.log(result)
//     const data = result.data; // Axios returns data directly in result.data
//     console.log(data);
    
// }
// dataFromMongodb()

app.get('/get-embeddings', async (req, res) => {
    const sentence = "I find joy in gardening and nurturing plants. There's something satisfying about growing my own herbs and vegetables."; 
    if (!sentence) {
        return res.status(400).json({ error: 'Sentence is required' });
    }
    try {
        const embeddings = await getEmbeddings(sentence);
        const response = usersData.map((user, index) => ({
            id: user.id,
            matchingScore: embeddings[index].toFixed(2) 
        }));
        // console.log(response)

        const sortedResponse = response.sort((a, b) => b.embedding - a.embedding)
        console.log(sortedResponse)

        return res.json(sortedResponse);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
