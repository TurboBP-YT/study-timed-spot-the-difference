import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {

    let participantUUID:string = '';

    try {
        const response = await fetch('https://study-timed-spot-the-difference.vercel.app/api/connect');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        participantUUID = data.uuid;
    } catch (error) {
        console.error('Fetching error:', error);
    }

	return {
		participantUUID
	};
};