import axios from "axios";
import { serverApi } from "../../lib/config";
import { LoginInput, Member, MemberInput, MemberUpdateInput } from "../../lib/types/member";
import { CloseFullscreen } from "@mui/icons-material";



class MemberService {
	private readonly path: string;

	constructor() {
		this.path = serverApi;
	}

	public async getTopUsers(): Promise<Member[]> {
		try {
			const url = this.path + `/member/top-users`;

			const result = await axios.get(url);
			console.log("getTopUsers", result);

			return result.data;
		} catch (error) {
			console.log("Error in getTOPUSERS: ", error);
			throw error;
		}
	}

	public async getRestaurant(): Promise<Member> {
		try {
			const url = this.path + `/member/restaurant`;

			const result = await axios.get(url);
			console.log("getTopUsers", result);

			const restaurant: Member = result.data;
			return restaurant;
		} catch (error) {
			console.log("Error in getTOPUSERS: ", error);
			throw error;
		}
	}

	public async signup(input: MemberInput): Promise<Member> {
		try {
			const url = `${this.path}/member/signup`;
			console.log(url);
			const result = await axios.post(url, input, { withCredentials: true });

			const member: Member = result.data.member;

			localStorage.setItem("memberData", JSON.stringify(member));
			return member;
		} catch (error) {
			console.log("Error in signup ", error);
			throw error;
		}
	}

	public async login(input: LoginInput): Promise<Member> {
		try {
			const url = `${this.path}/member/login`;
			console.log(url);
			const result = await axios.post(url, input, { withCredentials: true });

			const member: Member = result.data.member;

			localStorage.setItem("memberData", JSON.stringify(member));
			return member;
		} catch (error) {
			console.log("Error in login ", error);
			throw error;
		}
	}
	public async logout(): Promise<void> {
		try {
			const url = `${this.path}/member/logout`;

			const result = await axios.post(url, {}, { withCredentials: true });
			localStorage.removeItem("memberData");
		} catch (error) {
			console.log("Error in logout ", error);
			throw error;
		}
	}
	public async updateMember(input: MemberUpdateInput): Promise<Member> {
		try {

			const formData = new FormData();
			formData.append("memberNick", input.memberNick || "");
			formData.append("memberPhone", input.memberPhone || "");
			formData.append("memberAddress", input.memberAddress || "");
			formData.append("memberDesc", input.memberDesc || "");
				formData.append("memberImage", input.memberImage || "");

			const result = await axios(`${this.path}/member/update`, {
				method: "POST",
				data: formData,
				withCredentials: true,
				headers: {
					"Content-Type":"multipart/form-data",
				}
				
			});
			

			console.log("updateMember", result.data);
			
			const member: Member = result.data;

		localStorage.setItem("memberData", JSON.stringify(member));
			return member;
		} catch (error) {
			console.log("Error in updateMember", error);
			throw error;
		}
	}
}

export default MemberService;