const AppleCampus = {
  checkpoints: [
    {
      latlng: {
        latitude: 37.33177,
        longitude: -122.03078
      },
      title: 'checkpoint 1'
    },
    {
      latlng: {
        latitude: 37.33097,
        longitude: -122.02859
      },
      title: 'checkpoint 2'
    },
    {
      latlng: {
        latitude: 37.33319,
        longitude: -122.02881
      },
      title: 'checkpoint 3'
    }
  ],
  initialRegion: {
    latitude: 37.33197, 
    longitude: -122.02971
  }
};

const HackReactor = {
  checkpoints: [
    {
      latlng: {
        latitude: 37.78369,
        longitude: -122.40896
      },
      title: 'checkpoint 1'
    },
    {
      latlng: {
        latitude: 37.78757,
        longitude: -122.40353
      },
      title: 'checkpoint 2'
    },
    {
      latlng: {
        latitude: 37.79079,
        longitude: -122.39958
      },
      title: 'checkpoint 3'
    },
    {
      latlng: {
        latitude: 37.79334,
        longitude: -122.39627
      },
      title: 'checkpoint 4'
    },
    {
      latlng: {
        latitude: 37.79727, 
        longitude: -122.39709
      },
      title: 'checkpoint 5'
    },
    {
      latlng: {
        latitude: 37.79649,
        longitude: -122.40361
      },
      title: 'checkpoint 6'
    },
    {
      latlng: {
        latitude: 37.79588,
        longitude: -122.40833
      },
      title: 'checkpoint 7'
    },
    {
      latlng: {
        latitude: 37.7954,
        longitude: -122.41155
      },
      title: 'checkpoint 8'
    },
    {
      latlng: {
        latitude: 37.79093,
        longitude: -122.41069
      },
      title: 'checkpoint 9'
    },
    {
      latlng: {
        latitude: 37.78716,
        longitude: -122.40988
      },
      title: 'checkpoint 10'
    }
  ],
  initialRegion: {
    latitude: 37.79198,
    longitude: -122.40533
  }
};

const Sunset = {
  checkpoints: [
    {
      latlng: {
        latitude: 37.76406,
        longitude:  -122.50991
      },
      title: 'checkpoint 1'
    },
     {
      latlng: {
        latitude: 37.76454, 
        longitude: -122.49987
      },
      title: 'checkpoint 2'
    },
     {
      latlng: {
        latitude: 37.76481,
        longitude: -122.49137
      },
      title: 'checkpoint 3'
    },
     {
      latlng: {
        latitude: 37.76528, 
        longitude: -122.48047
      },
      title: 'checkpoint 4'
    },
     {
      latlng: {
        latitude: 37.76569,
        longitude: -122.4718
      },
      title: 'checkpoint 5'
    },
     {
      latlng: {
        latitude: 37.76589,
        longitude: -122.46425
      },
      title: 'checkpoint 6'
    },
     {
      latlng: {
        latitude: 37.76026,
        longitude: -122.46399
      },
      title: 'checkpoint 7'
    },
     {
      latlng: {
        latitude: 37.75985,
        longitude: -122.47807
      },
      title: 'checkpoint 8'
    },
     {
      latlng: {
        latitude: 37.75422,
        longitude: -122.47773
      },
      title: 'checkpoint 9'
    },
     {
      latlng: {
        latitude: 37.74866,
        longitude: -122.4773
      },
      title: 'checkpoint 10'
    },
     {
      latlng: {
        latitude: 37.74309,
        longitude: -122.47678
      },
      title: 'checkpoint 11'
    },
     {
      latlng: {
        latitude: 37.74282,
        longitude: -122.48442
      },
      title: 'checkpoint 12'
    },
     {
      latlng: {
        latitude: 37.74241,
        longitude: -122.49455
      },
      title: 'checkpoint 13'
    },
     {
      latlng: {
        latitude: 37.74201,
        longitude: -122.5015
      },
      title: 'checkpoint 14'
    },
     {
      latlng: {
        latitude: 37.74173,
        longitude: -122.50717
      },
      title: 'checkpoint 15'
    },
     {
      latlng: {
        latitude: 37.7492,
        longitude: -122.50811
      },
      title: 'checkpoint 16'
    },
     {
      latlng: {
        latitude: 37.7566,
        longitude: -122.50897
      },
      title: 'checkpoint 17'
    }
  ],
  initialRegion: {
    latitude: 37.75524,
    longitude: -122.48871
  }
};

const sample = [
    {
      latlng: {
        latitude: 37.33137,
        longitude: -122.03078
      },
      title: 'checkpoint 1'
    },
    {
      latlng: {
        latitude: 37.331092,
        longitude: -122.030757
      },
      title: 'checkpoint 2'
    },
    {
      latlng: {
        latitude: 37.330691,
        longitude: -122.030618
      },
      title: 'checkpoint 3'
    },
    {
      latlng: {
        latitude: 37.330637,
        longitude:  -122.029786
      },
      title: 'checkpoint 4'
    },
    {
      latlng: {
        latitude: 37.330537,
        longitude: -122.028886
      },
      title: 'checkpoint 5'
    }
  ]

module.exports = {
  easy: AppleCampus,
  medium: HackReactor,
  difficult: Sunset,
  sample: sample
};

