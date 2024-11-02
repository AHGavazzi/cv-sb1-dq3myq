import { MatchResult } from '../types';

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
const OPENAI_MODEL = import.meta.env.VITE_OPENAI_MODEL;

async function callOpenAI(prompt: string) {
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: OPENAI_MODEL,
        messages: [
          {
            role: 'system',
            content: 'You are an expert AI resume analyzer. Analyze the resume against the job description and provide detailed feedback.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7
      })
    });

    if (!response.ok) {
      throw new Error('OpenAI API call failed');
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Error calling OpenAI:', error);
    throw error;
  }
}

export async function analyzeResume(
  resumeText: string,
  jobDescription: string
): Promise<MatchResult> {
  try {
    const prompt = `
      Job Description:
      ${jobDescription}

      Resume:
      ${resumeText}

      Please analyze this resume against the job description and provide:
      1. A match score (0-100)
      2. Key matching points
      3. Red flags or areas of improvement
      4. Interview questions
      5. Career development suggestions
      6. CV improvement recommendations
      
      Format the response as a structured JSON object.
    `;

    const aiResponse = await callOpenAI(prompt);
    let analysis;
    
    try {
      analysis = JSON.parse(aiResponse);
    } catch {
      // Fallback to default structure if parsing fails
      analysis = {
        score: 70,
        matchReasons: ['AI analysis completed'],
        redFlags: {
          '🚩': [],
          '📍': [],
          '⛳': []
        }
      };
    }

    return {
      filename: 'resume.pdf',
      score: analysis.score || 70,
      emoji: '✨',
      label: 'AI Analyzed',
      matchReasons: analysis.matchReasons || ['Analysis completed'],
      redFlags: analysis.redFlags || {
        '🚩': [],
        '📍': [],
        '⛳': []
      },
      aiAnalysis: {
        interviewer: {
          questions: analysis.interviewQuestions || [],
          recommendations: analysis.interviewRecommendations || []
        },
        careerCounselor: {
          careerPaths: analysis.careerPaths || [],
          skillGaps: analysis.skillGaps || [],
          recommendations: analysis.careerRecommendations || []
        },
        recruiter: {
          cvImprovements: analysis.cvImprovements || [],
          potentialRoles: analysis.potentialRoles || [],
          marketInsights: analysis.marketInsights || []
        }
      }
    };
  } catch (error) {
    console.error('Error analyzing resume:', error);
    throw error;
  }
}