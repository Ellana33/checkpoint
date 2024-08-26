import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { Country } from "../entity/Country";
import dataSource from "../database/dataSource";

@Resolver(Country)
export class CountryResolver {
  private countryRepository = dataSource.getRepository(Country);

  @Mutation(() => Country)
  async createCountry(
    @Arg("code") code: string,
    @Arg("name") name: string,
    @Arg("emoji") emoji: string,
    @Arg("continent") continent: string
  ): Promise<Country> {
    const country = this.countryRepository.create({ code, name, emoji, continent });
    return await this.countryRepository.save(country);
  }

  @Query(() => [Country])
  async countries(): Promise<Country[]> {
    return await this.countryRepository.find();
  }

  @Query(() => Country, { nullable: true })
  async countryByCode(@Arg("code") code: string): Promise<Country | null> {
    return await this.countryRepository.findOne({ where: { code } });
  }

  @Query(() => [Country])
  async countriesByContinent(@Arg("continent") continent: string): Promise<Country[]> {
    return await this.countryRepository.find({ where: { continent } });
  }
}