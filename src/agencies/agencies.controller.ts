import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { AgenciesService } from "./agencies.service";
import { ApiKeyGuard } from "./api-key.guard";
import { AgencyDto } from "./dto/agency.dto";
import { Agency } from "./dto/agency.entity";

@Controller("agencies")
export class AgenciesController {
  constructor(private readonly agenciesService: AgenciesService) {}

  @Get()
  public async getAll(): Promise<Agency[]> {
    return await this.agenciesService.findAll();
  }

  @Get("/:id")
  public async getById(@Param("id") id: string): Promise<Agency> {
    return await this.agenciesService.findById(id);
  }

  @Post()
  @UseGuards(ApiKeyGuard)
  public async postAgency(
    @Body()
    agency: AgencyDto,
  ): Promise<Agency> {
    return await this.agenciesService.create(agency);
  }
}
