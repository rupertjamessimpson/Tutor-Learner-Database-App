export interface Tutor {
	tutor_id: number;
	first_name: string;
	last_name: string;
	email: string;
	phone: number;
	available: boolean;
	conversation: boolean;
	esl_novice: boolean;
	esl_beginner: boolean;
	esl_intermediate: boolean;
	citizenship: boolean;
	sped_ela:	boolean;
	basic_math: boolean;
	basic_reading: boolean;
	basic_writing: boolean;
}