interface XmlRes {
  MPD: {
    $: {
      mediaPresentationDuration: string;
      minBufferTime: string;
      profiles: string;
      type: string;
      xmlns: string;
      xsi: string;
    };
    Period: [
      {
        $: {
          duration: string;
        };
        AdaptationSet: [
          {
            $: {
              contentType: string;
              group: string;
              mimeType: string;
              segmentAlignment: string;
              startWithSAP: string;
              subsegmentAlignment: string;
              subsegmentStartsWithSAP: string;
            };
            Representation: [
              {
                $: {
                  audioSamplingRate: string;
                  bandwidth: string;
                  codecs: string;
                  id: string;
                };
                AudioChannelConfiguration: [
                  {
                    $: {
                      schemeIdUri: string;
                      value: string;
                    };
                  }
                ];
                BaseURL: [string];
                SegmentBase: [
                  {
                    $: {
                      indexRange: string;
                      indexRangeExact: string;
                      timescale: string;
                    };
                    Initialization: [
                      {
                        $: {
                          range: string;
                        };
                      }
                    ];
                  }
                ];
              }
            ];
          },
          {
            $: {
              contentType: string;
              group: string;
              maxFrameRate: string;
              maxHeight: string;
              maxWidth: string;
              mimeType: string;
              segmentAlignment: string;
              startWithSAP: string;
              subsegmentAlignment: string;
              subsegmentStartsWithSAP: string;
            };
            Representation: Array<{
              $: {
                bandwidth: string;
                codecs: string;
                frameRate: string;
                height: string;
                id: string;
                scanType: string;
                width: string;
              };
              BaseURL: [string];
              SegmentBase: [
                {
                  $: {
                    indexRange: string;
                    indexRangeExact: string;
                    timescale: string;
                  };
                  Initialization: [
                    {
                      $: {
                        range: string;
                      };
                    }
                  ];
                }
              ];
            }>;
          }
        ];
      }
    ];
  };
}
